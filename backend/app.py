import os
import time
from flask import Flask, request, jsonify, g
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pydantic import ValidationError

import datetime as dt
import secrets
import jwt
from schemas import LeadIn, LoginIn, LeadUpdate
from dotenv import load_dotenv
from functools import wraps

import sheets
from sqlalchemy import select, func
from sqlalchemy.orm import joinedload
from db import SessionLocal
from models import Hostel, Lead
from logger import configure_logging, get_logger

load_dotenv()
configure_logging()
log = get_logger(__name__)
app = Flask(__name__)
allowed_origins = os.environ.get(
    "ALLOWED_ORIGINS",
    "http://localhost:3000",
).split(",")
CORS(app, origins=allowed_origins)

limiter = Limiter(
    key_func=get_remote_address,
    app=app,
    storage_uri="memory://",
)
_VALID_BACKENDS = {"postgres", "sheets", "both"}

LEAD_WRITE_BACKEND = os.environ.get("LEAD_WRITE_BACKEND", "both").lower()
if LEAD_WRITE_BACKEND not in _VALID_BACKENDS:
    raise ValueError(
        f"LEAD_WRITE_BACKEND must be one of {_VALID_BACKENDS}, got {LEAD_WRITE_BACKEND!r}"
    )

LEAD_READ_BACKEND = os.environ.get("LEAD_READ_BACKEND", "postgres").lower()
if LEAD_READ_BACKEND not in _VALID_BACKENDS:
    raise ValueError(
        f"LEAD_READ_BACKEND must be one of {_VALID_BACKENDS}, got {LEAD_READ_BACKEND!r}"
    )

JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGO = "HS256"
JWT_EXP_HOURS = 8
ADMIN_USERNAME = os.environ["ADMIN_USERNAME"]
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]


@app.before_request
def log_request_received():
    g.start_time = time.time()
    log.info("request.received", extra={"method": request.method, "path": request.path})


@app.after_request
def log_request_completed(response):
    duration_ms = round((time.time() - g.start_time) * 1000, 2) if hasattr(g, "start_time") else None
    log.info("request.completed", extra={
        "method": request.method,
        "path": request.path,
        "status": response.status_code,
        "duration_ms": duration_ms,
    })
    return response


@app.errorhandler(429)
def handle_rate_limit_exceeded(error):
    log.warning("rate_limit.exceeded", extra={
        "method": request.method,
        "path": request.path,
        "ip": get_remote_address(),
        "limit": str(error.description),
    })
    return jsonify({
        "error": "Too many requests",
        "message": "slow down - you have hit the rate limit .Try again in a minute.",

    }), 429


@app.errorhandler(404)
def handle_not_found(error):
    return jsonify({
        "error": "Not found",
        "message": "The requested URL does not exist on this server.",
    }), 404


@app.errorhandler(405)
def handle_method_not_allowed(error):
    return jsonify({
        "error": "Method not allowed",
        "message": "This URL does not accept that HTTP method.",
    }), 405


@app.errorhandler(500)
def handle_server_error(error):
    return jsonify({
        "error": "Internal server error",
        "message": "Something went wrong on our end. Please try again,",
    }), 500


@app.errorhandler(ValidationError)
def handle_validation_error(error):
    log.warning("validation.failed", extra={
        "path": request.path,
        "method": request.method,
        "errors": error.errors(),
    })
    return jsonify({
        "error": "Validation failed",
        "message": "One or more fields are invalid.",
        "details": [
            {"field": ".".join(str(x) for x in e["loc"]), "issue": e["msg"]}
            for e in error.errors()
        ],
    }), 400


@app.errorhandler(Exception)
def handle_unexpected(error):
    log.exception("unhandled.exception")
    return jsonify({
        "error": "Unexpected error",
        "message": "Something went wrong. Please try again.",

    }), 500


@app.route("/")
def home():
    return {"message": "Lalpur Hostels backend is alive!"}


@app.route("/hostels")
def list_hostels():
    return {
        "hostels": [
            "Muskan Girls Hostel",
            "Sanskriti Girls Hostel",
            "Sankalp Boys Hostel",
        ]
    }


@app.route("/login", methods=["POST"])
@limiter.limit("10 per minute")
def login():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Request body must be JSON"}), 400

    creds = LoginIn(**data)

    valid_user = secrets.compare_digest(creds.username, ADMIN_USERNAME)
    valid_pass = secrets.compare_digest(creds.password, ADMIN_PASSWORD)
    if not (valid_user and valid_pass):
        log.warning("login.failed", extra={
            "username": creds.username,
            "ip": get_remote_address(),
        })
        return jsonify({"error": "Invalid credentials"}), 401
    now = dt.datetime.now(dt.timezone.utc)
    payload = {
        "sub": creds.username,
        "iat": now,
        "exp": now + dt.timedelta(hours=JWT_EXP_HOURS),
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGO)

    log.info("login.success", extra={"username": creds.username})
    return jsonify({
        "access_token": token,
        "token_type": "bearer",
        "expires_in": JWT_EXP_HOURS * 3600,
    }), 200


def require_auth(view_func):
    @wraps(view_func)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            log.warning("auth.missing", extra={
                "path": request.path,
                "ip": get_remote_address(),
            })
            return jsonify({"error": "Missing or malformed Authorization header"}), 401

        token = auth_header[len("Bearer "):]
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGO])
        except jwt.ExpiredSignatureError:
            log.warning("auth.expired", extra={
                "path": request.path,
                "ip": get_remote_address(),
            })
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            log.warning("auth.invalid", extra={
                "path": request.path,
                "ip": get_remote_address(),

            })

            return jsonify({"error": "Invalid token"}), 401

        g.user = payload
        return view_func(*args, **kwargs)

    return wrapper


def _stats_per_hostels():
    """One GROUP BY query: per-hostel total + actioned counts. LEFT JOIN
    so hostels with zero leads still appear with 0/0."""
    with SessionLocal() as session:
        stmt = (
            select(
                Hostel.id.label("hostel_id"),
                Hostel.name.label("hostel"),
                func.count(Lead.id).label("total"),
                func.count(Lead.id).filter(Lead.actioned).label("actioned"),

            )
            .select_from(Hostel)
            .outerjoin(Lead, Lead.hostel_id == Hostel.id)
            .group_by(Hostel.id, Hostel.name)
            .order_by(Hostel.id)
        )
        rows = session.execute(stmt).all()
        return [
            {
                "hostel_id": row.hostel_id,
                "hostel": row.hostel,
                "total": row.total,
                "actioned": row.actioned,
                "pending": row.total - row.actioned,
            }
            for row in rows
        ]


def _read_leads_postgres():
    """One JOIN query: leads + their hostel name. Eager-loaded to avoid N+1."""
    with SessionLocal() as session:
        stmt = (
            select(Lead)
            .options(joinedload(Lead.hostel))
            .order_by(Lead.created_at.desc())
        )
        return [
            {
                "id": lead.id,
                "hostel": lead.hostel.name,
                "name": lead.name,
                "phone": lead.phone,
                "action": lead.action,
                "actioned": lead.actioned,
                "remarks": lead.remarks,
                "created_at": lead.created_at.isoformat(),
                "source": "postgres",
            }
            for lead in session.scalars(stmt)
        ]


def _read_leads_sheets():
    rows = sheets.read_all_leads()
    for row in rows:
        row["source"] = "sheets"
    return rows


@app.route("/admin/leads", methods=["GET"])
@require_auth
def list_admin_leads():
    source = (request.args.get("source") or LEAD_READ_BACKEND).lower()
    if source not in _VALID_BACKENDS:
        return jsonify({
            "error": "Invalid source",
            "message": f"source must be one of: {sorted(_VALID_BACKENDS)}",
        }), 400

    leads = []
    if source in ("postgres", "both"):
        leads.extend(_read_leads_postgres())

    if source in ("sheets", "both"):
        try:
            leads.extend(_read_leads_sheets())
        except Exception:
            if source == "sheets":
                raise  # Sheets is the only backend — request must fail
            log.exception("admin.leads.sheets.failed_secondary")

    log.info("admin.leads.viewed", extra={
        "username": g.user["sub"],
        "count": len(leads),
        "source": source,
    })
    return jsonify({"leads": leads, "count": len(leads), "source": source}), 200


@app.route("/admin/leads/<int:lead_id>", methods=["PATCH"])
@limiter.limit("30 per minute")
@require_auth
def update_lead(lead_id):
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Request body must be JSON"}), 400

    update = LeadUpdate(**data)

    with SessionLocal() as session:
        lead = session.get(Lead, lead_id)
        if lead is None:
            return jsonify({"error": "Lead not found"}), 404

        changes = update.model_dump(exclude_unset=True)
        if not changes:
            return jsonify({"error": "No fields to update"}), 400

        for field, value in changes.items():
            setattr(lead, field, value)
        session.commit()

        log.info("lead.updated", extra={
            "lead_id": lead.id,
            "username": g.user["sub"],
            "fields_changed": list(changes.keys()),
        })
        return jsonify({
            "id": lead.id,
            "actioned": lead.actioned,
            "remarks": lead.remarks,
        }), 200


@app.route("/admin/stats", methods=["GET"])
@limiter.limit("60 per minute")
@require_auth
def admin_stats():
    stats = _stats_per_hostels()
    log.info("admin.stats.viewed", extra={
        "Username": g.user["sub"],
        "hostel_count": len(stats),
    })
    return jsonify({"stats": stats}), 200


@app.route("/lead", methods=["POST"])
@limiter.limit("5 per minute")
def capture_lead():
    data = request.get_json(silent=True)
    if data is None:
        return jsonify({"error": "Request body must be JSON"}), 400

    lead_in = LeadIn(**data)
    new_lead_id = None

    # Primary: Postgres
    if LEAD_WRITE_BACKEND in ("postgres", "both"):
        with SessionLocal() as session:
            hostel = session.scalar(
                select(Hostel).where(Hostel.name == lead_in.hostel)
            )
            if hostel is None:
                log.warning("lead.unknown_hostel", extra={"hostel": lead_in.hostel})
                return jsonify({"error": "Unknown hostel"}), 400

            new_lead = Lead(
                hostel_id=hostel.id,
                name=lead_in.name,
                phone=lead_in.phone,
                action=lead_in.action,
            )
            session.add(new_lead)
            session.commit()
            new_lead_id = new_lead.id
            log.info("lead.postgres.captured", extra={
                "lead_id": new_lead.id,
                "hostel": lead_in.hostel,
            })

    # Secondary: Sheets (best-effort when "both", primary when "sheets")
    if LEAD_WRITE_BACKEND in ("sheets", "both"):
        try:
            sheets.append_lead(lead_in.hostel, lead_in.name, lead_in.phone, lead_in.action)
            log.info("lead.sheets.captured", extra={"hostel": lead_in.hostel})
        except Exception:
            if LEAD_WRITE_BACKEND == "sheets":
                raise  # Sheets is the only backend — request must fail
            log.exception("lead.sheets.failed_secondary")  # best-effort, don't fail

    return jsonify({
        "status": "ok",
        "message": "Lead captured",
        "lead_id": new_lead_id,
    }), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
