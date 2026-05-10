# Learning Journal

This file tracks the user's web dev + GenAI learning journey. Read this at the start of every session to pick up where we left off.

**Learner:** Pratik — hostel owner in Ranchi, strong DSA, newbie to dev
**Time budget:** ~6 hours/week
**Stack path:** Python + Flask (primary) → Node.js (middle) → GenAI projects
**Training ground:** The hostel website in this repo (Next.js frontend + Python/Flask backend)

---

## Roadmap — "Expanded Hostel Ecosystem" (locked 2026-04-24)

**User's goal:** Deep mastery of backend architecture, system design, and GenAI (LLMs + RAG).
**Approach:** One coherent layered project (NOT separate projects) that grows with each phase.
**Pace:** 6 hrs/week.
**Target completion:** ~November 2026 (~6-7 months from kickoff).

Architecture growing across phases:
```
🌐 Next.js website
🔌 Flask API gateway (middleware, auth)
💾 Postgres DB + Redis cache
🧵 Celery background jobs
🤖 GenAI services (chatbot, RAG, agents, WhatsApp)
📊 Admin dashboard
```

### Phase 1 — Web App Foundation ✅ COMPLETE
- [x] **M1:** Lead-capture Flask API ✅ COMPLETE 2026-04-23
- [x] **M2:** Connect Next.js frontend to Flask backend ✅ COMPLETE 2026-04-26
- [x] **M3:** Deploy LIVE on internet ✅ COMPLETE 2026-04-27 — Frontend on Vercel (`hostel-web-sand.vercel.app`), backend on Render (`lalpur-hostels-backend.onrender.com`). End-to-end tested with real public traffic. 12-factor pattern with `NEXT_PUBLIC_API_URL` (Vercel) + `SHEET_ID`/`ALLOWED_ORIGINS`/`GOOGLE_CREDENTIALS_JSON` (Render). gunicorn + Procfile. Debugged 3 real production bugs: PowerShell UTF-16 encoded requirements.txt, Vercel build cache holding old env vars, trailing space in env var (showed as `%20` in URL). DevTools Network tab debugging proven critical.

🎉 **PHASE 1 PRODUCT IS LIVE AND CAPTURING LEADS FROM THE PUBLIC INTERNET** 🎉

---

## Session Diary (running log of micro-wins per day)

### 2026-05-11 — 🏆 M6.1 COMPLETE — PATCH /admin/leads/<id> shipped + audit-logged
- ✅ Step 1: `LeadUpdate` Pydantic schema in `schemas.py` — `Optional[bool] actioned`, `Optional[str] remarks` (max_length=1000), `model_config = ConfigDict(extra="forbid")`.
- ✅ Step 2: `@app.route("/admin/leads/<int:lead_id>", methods=["PATCH"])` skeleton with `@limiter.limit("30 per minute")` + `@require_auth`. Sanity-tested routing layer: no auth → 401, non-int path → 404 from Flask's `<int:>` converter (before any handler code runs), invalid JWT → 401.
- ✅ Step 3: validation + 404. `update = LeadUpdate(**data)` runs first (raises ValidationError → global handler returns 400 with field details), then `with SessionLocal() as session: lead = session.get(Lead, lead_id)` — `None` → 404. Discovered Pydantic v2 lax bool coercion: `"yes"/"true"/"1"/"on"/"y"/"t"` → True, `"no"/"false"/...` → False (feature for form-encoded data, not a bug). Strict rejection only when value isn't in the coercion table (`"banana"` → 400).
- ✅ Step 4: partial update via `changes = update.model_dump(exclude_unset=True)`. Three-state field semantics — `exclude_unset` distinguishes "user didn't send the field" from "user sent null". Iterated `setattr(lead, field, value)` then `session.commit()`. Empty body → 400 "No fields to update". Returns `{id, actioned, remarks}`. Verified the load-bearing test: PATCH `{"remarks":"..."}` alone leaves `actioned` untouched (no silent wipe).
- ✅ Step 5: audit log `log.info("lead.updated", extra={"lead_id", "username": g.user["sub"], "fields_changed": list(changes.keys())})`. Logged *after* commit (commit-first-then-log rule — log-before-commit creates lies in the audit trail when commits fail). Logged keys only, not values (PII safety — `remarks` could contain personal info).
- 🧪 End-to-end tested against prod Render Postgres via curl. Bootstrapped a test lead via `POST /lead` (table was empty post-deploy). PATCH happy path + 404 + bad-type 400 + unknown-field 400 + empty-body 400 all green. Audit log JSON confirmed in Flask console with correct `fields_changed` per call.
- 🪤 Real debugging: PowerShell + curl + escaped JSON is a constant pain. Settled on `'...' | Out-File -Encoding ascii body.json` + `--data-binary "@body.json"` as the clean pattern. Also: pasted a JWT with mismatched quotes (`"Bearer "eyJ...`) → curl tried to use the token as a hostname (`Could not resolve host`). Fix: store token in `$TOKEN` once, use `"Bearer $TOKEN"` everywhere.
- New concepts: **PATCH vs PUT vs POST** (modify-parts vs replace-all vs create); **Flask path converters** `<int:lead_id>` push input validation to the routing layer (free 404 before your code runs); **decorator stack order matters** — outermost runs first on inbound requests; **validate-before-DB rule** — cheap checks first, expensive side effects last (Pydantic µs vs Postgres ms, 1000× cost gap); **`session.get(Model, pk)` vs `select().where()`** — first uses identity map (in-memory cache) and is the idiom for PK lookups; **404 vs 400 semantics** — malformed request vs well-formed-but-target-missing (analogy: "number not in service" vs "no subscriber assigned"); **Pydantic v2 lax bool coercion** (intentional, for form-encoded compat); **three-state field semantics** with `exclude_unset` (not-sent / sent-with-value / sent-null) — `__pydantic_fields_set__` tracks user-touched fields; **`setattr` + ORM dirty tracking** — SQLAlchemy session keeps a dirty set, commit issues minimal `UPDATE` SQL; **audit logs as append-only event sourcing** — current state is hash map, log is the immutable history (bank passbook analogy); **log-after-commit ordering** rule; **PII safety in logs** — log field names, not values.
- 🧰 Tracker UI used for the first time (TaskCreate/TaskUpdate) — shows live sub-step progress in Claude Code footer. Useful for keeping the human in the loop without me having to re-narrate state.

### 2026-05-10 — 🏆 PATH B COMPLETE — Production Render Postgres live + dual-write working
- ✅ Provisioned Render Postgres (free tier, Singapore region, PG 16). Saved Internal + External URLs to `backend/.env` as `RENDER_DATABASE_URL_INTERNAL`/`EXTERNAL` for safekeeping. Local `DATABASE_URL` deliberately left pointing at local Postgres (dev/prod isolation).
- ✅ Added 6 env vars to Render web service: `DATABASE_URL` (internal URL), `LEAD_WRITE_BACKEND=both`, `LEAD_READ_BACKEND=postgres`, plus `JWT_SECRET`/`ADMIN_USERNAME`/`ADMIN_PASSWORD` (the auth vars caught by first failed deploy — `KeyError: 'JWT_SECRET'` at app.py:52).
- ✅ Ran `alembic upgrade head` from laptop against Render Postgres External URL via temporary `$env:DATABASE_URL` override in a fresh PowerShell window (cleanest scope isolation pattern). First connection hit cold-start latency from Singapore — user hit Ctrl+C prematurely; retry succeeded once DB warmed up.
- ✅ Ran `seed_hostels.py` against Render Postgres → 3 hostels seeded with ids 1/2/3.
- ✅ Committed + pushed everything (commit `d004a19` — message accidentally reused "Use NEXT_PUBLIC_API_URL for backend endpoint" via arrow-key recall, content correct, left as-is rather than force-push). Render auto-deploy first failed (missing 3 auth env vars), fixed, redeployed green.
- ✅ Live smoke tests: login → JWT, GET `/admin/leads?source=postgres` → empty, POST `/lead` (with full hostel name "Muskan Girls Hostel" — the schema rejects slug "muskan" with 400, Literal types are exact-match), re-read → 1 lead, `?source=sheets` → also has the new row → dual-write proven end-to-end against production.
- 📌 Reminder set: Render free Postgres expires ~2026-08-08; memory will proactively warn from late July onward.
- New concepts: 3-tree git model (working dir → staging → repo → remote); `git add` is idempotent + cumulative; staged-but-modified files (need re-add to refresh staging); commit-message-via-arrow-key trap; never force-push to rewrite published history; PowerShell paste-fragmentation (recurring) — workaround = single physical line OR `$files = @(...)` array; process-scoped env var overrides (`$env:VAR` only affects current PowerShell window — close window = clean revert); Internal vs External DB URLs (private DNS namespace vs public); cold-start latency on free-tier serverless DBs; fail-fast at boot via `os.environ["X"]` (raises KeyError) vs `os.environ.get("X")` (returns None); Pydantic `Literal` is exact-match (case + spelling sensitive); reading 4xx response bodies in PowerShell via `$_.Exception.Response.GetResponseStream()`.

### 2026-05-07 (evening session ENDED — sleeping, resume tomorrow) — 🏆 M5.3 COMPLETE + 🎯 SCOPE PIVOT

**🛌 Tomorrow's first move (Path B — production Render Postgres setup):**
1. Spin up Render Postgres free tier (90-day trial) from Render dashboard.
2. Copy the External Database URL into Render's web-service env vars as `DATABASE_URL`.
3. Add `LEAD_WRITE_BACKEND=both` and `LEAD_READ_BACKEND=postgres` to Render's env vars.
4. Connect locally via psql to the Render Postgres URL → run `alembic upgrade head` against it (or use Render Shell). Re-run `seed_hostels.py` against it.
5. Smoke-test: hit live `/admin/leads?source=postgres` from a browser, confirm 200 + JSON.
6. NOW commit + push everything (M5.2 + M5.3 + scope pivot work). Render auto-redeploys; site stays up because DATABASE_URL is now set.
7. After deploy is green, start M6.1 (PATCH /admin/leads/<id>).

**⚠️ Uncommitted local changes exist** — don't `git restore` or `git stash drop`. Files in flight:
- backend/app.py, backend/sheets.py (modified — dual-read, indentation bug fix)
- backend/db.py, backend/models.py, backend/schemas.py, backend/init_db.py, backend/seed_hostels.py (new from M5.2/M5.3)
- backend/migrations/ (entire dir — Alembic scaffold + a3d3de76dd03_initial_schema.py)
- backend/alembic.ini (new)
- backend/requirements.txt (modified — added alembic + sqlalchemy + psycopg2-binary)
- LEARNING.md, PROJECT2_ROADMAP.md (docs)
- ⛔ DO NOT commit .claude/settings.local.json (machine-local Claude config; should be gitignored, not version-controlled)

- ✅ M5.3 Step 1/6: `pip install alembic` (1.16.5), updated requirements.txt.
- ✅ M5.3 Step 2/6: `alembic init migrations` scaffolded `alembic.ini` + `migrations/` (env.py, script.py.mako, versions/).
- ✅ M5.3 Step 3/6: wired `migrations/env.py` — added `BACKEND_DIR` to `sys.path` so `db`/`models` imports work from `migrations/`, called `load_dotenv` for `DATABASE_URL`, set `target_metadata = Base.metadata`. Hit + fixed configparser interpolation bug: `set_main_option("sqlalchemy.url", ...)` choked on the `%40` (URL-encoded `@`) in the password because `%` is special in INI interpolation. Fix: bypass alembic.ini for the URL entirely — read `DATABASE_URL` directly into env.py's module scope and pass to `create_engine` in `run_migrations_online`. Concept: composition of parsers — same string passes through .env → configparser (`%` is special) → SQLAlchemy URL parser (`%XX` is hex escape). Each layer has its own escape grammar; bypassing a layer removes one grammar to worry about.
- ✅ M5.3 Step 4/6: dropped existing tables (Python one-liner via `Base.metadata.drop_all(engine)`) so autogenerate would have a real diff to compute. Hit PowerShell paste-fragmentation again — fixed by switching to a single short line.
- ✅ M5.3 Step 5/6: `alembic revision --autogenerate -m "initial schema"` produced `a3d3de76dd03_initial_schema.py`. Detected: added tables `hostels` + `leads`, added index `ix_leads_hostel_id`. Walked through the generated script — `op.create_table(...)` calls in dependency order for upgrade, `op.drop_index/drop_table(...)` in reverse order for downgrade. Schema is now versioned code.
- ✅ M5.3 Step 6/6: `alembic upgrade head` applied the migration → `alembic_version` + `hostels` + `leads` all created. `seed_hostels.py` re-inserted Muskan/Sanskriti/Sankalp as ids 1/2/3. **M5.3 COMPLETE.**
- 🎯 **SCOPE PIVOT — admin portal focus.** Pratik clarified: not building a full hotel-management system. The product is *lead-capture + admin dashboard for the 3 hostels he already runs*. Action: drop M5.4 (rooms/bookings/users) entirely. Existing schema (`Hostel` + `Lead` with action/actioned/remarks/created_at) already covers the real product needs. New direction: backend CRUD for leads (mark actioned, edit remarks, per-hostel stats) + Next.js admin frontend (login → dashboard → edit). Concept: YAGNI — building only what's needed, not what looked good on a roadmap. Real-world: small café doesn't buy industrial pizza ovens "in case." DSA: premature generalization is technical debt; building for "any hostel use case" without knowing the real ones produces a worse design than building for the 3 known ones.
- New concepts: Alembic versioned migrations (doubly-linked list of revisions; each has up/down; `alembic_version` table is the "you are here" pin); autogenerate compares model metadata vs live DB — relies on `import models` side-effect to register tables in `Base.metadata` (Alembic's #1 footgun); `op.create_table` / `op.drop_table` as the DDL operation API; revision id = git short-SHA-shaped 12-char hex; `down_revision = None` marks the head of the chain; configparser `%`-interpolation gotcha (escape grammar collision); composition of parsers as DSA pattern (each layer has own escape rules); CASCADE in DROP TABLE (graph traversal of FK dependency DAG).

### 2026-05-07 — 🏆 M5.2 COMPLETE
- ✅ M5.2 Step 3c COMPLETE: dual-read `/admin/leads` shipped. Added `LEAD_READ_BACKEND` env var (default `postgres`) with same fail-fast validation pattern as the write side, with `?source=` query param to override per request. Built `_read_leads_postgres()` using `select(Lead).options(joinedload(Lead.hostel)).order_by(Lead.created_at.desc())` — single JOIN query, no N+1. Built `_read_leads_sheets()` thin wrapper that tags rows. Refactored `list_admin_leads` for three-mode dispatch with provenance tagging (`source: "postgres"` or `source: "sheets"` per row + at top level). Best-effort secondary on sheets failure in `both` mode (same try/except pattern as write side). Cleaned up dead paste-leftover code from end of route handler. Also fixed long-standing indentation bug in `sheets.read_all_leads()` (was returning after only the first tab — explains why M4.6 reported "15 leads" instead of all 3 hostels' rows).
- ✅ M5.2 Step 3d COMPLETE (concept-only): user already understood I/O-dominates principle from M4.3 — chose to skip empirical latency capture and move on. Expected pattern: postgres ~5–30ms, sheets ~2000–3000ms, `both` ≈ sheets (sequential dispatch + small+big ≈ big). Amdahl's Law would still apply if parallelized — the slowest leg sets the floor.
- 🎯 **Schema-on-write vs schema-on-read became visible side-by-side in `?source=both` output.** Postgres rows: clean `name`/`phone`/`action`/`actioned`/`created_at` keys, phone as string, real boolean, ISO 8601 timestamp. Sheets rows: keys with leading/trailing spaces (` Name `, ` Phone`, ` Action`, ` Timestamp `, ` Remarks`) baked in from sloppy header cells, phone as int (one row had `phone: 0` because the cell was empty and got coerced), `Actioned` as the literal string `"NotActioned"` instead of a boolean. The whole reason Phase 3 exists, in one diff.
- Smoke test: postgres → 1 lead (the dual-write test row), sheets → 30 leads (was 15 before indentation fix — DOUBLE — Sanskriti and Sankalp tabs were silently invisible the whole time), both → 31 (1+30 ✓), `?source=bogus` → instant 400 with sorted valid options.
- New concepts: SQL JOIN + N+1 problem (real-world: librarian asking for each book's author one-at-a-time vs. handing over the stack; DSA: O(N) round-trips → O(1) round-trips, hash-join O(N+M) under the hood); `joinedload(Lead.hostel)` as explicit eager-load hint; `request.args.get("source") or LEAD_READ_BACKEND` as the per-request-override pattern (env sets default, query param overrides for one call); `.isoformat()` for JSON-safe datetime serialization; PowerShell terminal quirks — bracketed-paste mode off splits multi-line pastes at every newline, fix is to build commands in named variables (`$body`, `$tok`, `$headers`) so each line is atomic; HTTP 4xx as control-flow signal vs fault — `Invoke-RestMethod` flattens 4xx into exceptions but the body is the actual error message, server worked correctly; cache-invalidation gotcha — stale `$tok` survived the session boundary so PowerShell variable existed but its JWT was 8 hours dead (`exp` claim expired); clock-based authorization via NTP (real-world: train tickets); boundary instrumentation (`print(x)` at function entry — assert your assumptions before debugging the wrong layer).

### 2026-05-05 (paused mid-3c, resumed 2026-05-07)
- ✅ M5.2 Step 2/3 COMPLETE: defined `Hostel` and `Lead` models in `backend/models.py` using SQLAlchemy 2.0 typed style (`Mapped[int]`, `mapped_column(...)`). `Hostel` has `id`/`name`/`slug` with unique constraints; `Lead` has `id`/`hostel_id` (FK with `ondelete=CASCADE`, indexed)/`name`/`phone`/`action`/`actioned`/`remarks` (nullable Text)/`created_at` (timestamptz, default `lambda: datetime.now(timezone.utc)`). Bidirectional `relationship(back_populates=...)` with `cascade="all, delete-orphan"` on the parent side. Created one-shot `backend/init_db.py` that imports models and runs `Base.metadata.create_all(engine)`. Verified via `\dt` (both tables exist) and `\d leads` (FK + index + timestamptz all correct). Hit + fixed `Print` vs `print` (case-sensitivity gotcha). Concepts: ORM as Hindi↔English translator, declarative metadata as topo-sortable graph, schema-on-write vs schema-on-read.
- ✅ M5.2 Step 3a COMPLETE: created `backend/seed_hostels.py` (idempotent — checks `existing` before insert), seeded 3 hostels (ids 1/2/3 → muskan/sanskriti/sankalp). Hit + fixed `form` vs `from` typo (parser caret pointed one token *after* the actual mistake — useful debugging heuristic).
- ✅ M5.2 Step 3b COMPLETE: dual-write `capture_lead` with `LEAD_WRITE_BACKEND` env var (postgres|sheets|both, validated at startup with `ValueError` if invalid — fail-fast config). Postgres primary, Sheets secondary best-effort (swallows secondary failures with `log.exception`, raises if Sheets is the only backend). Imports added: `from sqlalchemy import select`, `from db import SessionLocal`, `from models import Hostel, Lead`. Verified id=1 in Postgres + matching row in Sheets. Hit PowerShell quoting hell with `curl.exe ... \`>>` (literal `>>` interpreted as redirect operator) — switched to `Invoke-RestMethod` with `ConvertTo-Json` (PowerShell-native HTTP client, no escaping). Concepts: feature flags as runtime config, dual-write / shadow write for migrations, Amdahl's Law (slowest leg dominates — `both` mode ~2500ms because Sheets dominates; cure is async/background, not parallel sync).

### 2026-05-03
- Resumed via `i will continue` hook — LEARNING.md auto-loaded
- ✅ M5.2 Step 1/3 COMPLETE: installed SQLAlchemy 2.0.49 + psycopg2-binary 2.9.12, set `DATABASE_URL` in .env, created `backend/db.py` with `engine` (connection pool, `future=True` for 2.0 API), `SessionLocal` (sessionmaker factory, `autocommit=False`/`autoflush=False` for explicit transactions), `Base` (declarative_base for ORM models). Hit + fixed the init-order trap: `db.py` originally read `os.environ["DATABASE_URL"]` at import time but didn't call `load_dotenv()` itself — meant standalone `python -c "import db"` would crash with KeyError because only `app.py` was loading .env. Fix: `db.py` now calls `load_dotenv()` itself (idempotent — safe to call again from app.py). Self-contained modules > import-order dependencies (12-Factor: "config must be available wherever it's needed"). Sanity test: `import db; conn = db.engine.connect(); conn.execute(text("SELECT 1"))` returned `1` against Postgres 18.3 — full SQLAlchemy → psycopg2 → TCP → Postgres path verified working.
- Concepts learned: connection pool (fixed-size cache of open TCP+auth connections — avoids ~5-50ms setup cost per query, like an object pool / free-list); Session as unit-of-work / staging area (git add → git commit analogy); declarative_base as a registry pattern (subclasses auto-register their tables in `Base.metadata`).

### 2026-05-02
- Final M4.6 fixes: cleaned up duplicate `except jwt.InvalidTokenError` block + corrected message text ("Invalid token" was returning "Token expired"). Re-ran auth flow test cleanly.
- 🏆 **PHASE 2 COMPLETE.** All 6 milestones (M4.1–M4.6) shipped over 6 days. Backend is now production-grade: auth, validation, rate limit, structured logs, error handlers, full audit trail.
- Settled on current pace after asking "should I increase speed?" — reviewed numbers (10 days actual vs 6 weeks planned = ~4× ahead) and chose to keep current pace.
- ✅ M5.1: Postgres install on Windows. Hit two snags — installer auto-launched Stack Builder which threw "must select a package" error (just cancelled it, Stack Builder is for optional add-ons), and `psql` wasn't on PATH after install (added `C:\Program Files\PostgreSQL\18\bin` to user PATH manually). Then connected via `psql -U postgres -h localhost`, hit a 1-letter typo (`postgress` instead of `postgres` — Postgres helpfully echoed the failing username back in the error). Created `lalpur_hostels` database, verified with `\l`. **M5.1 COMPLETE.**

### 2026-05-01
- Resumed via `i will continue` hook — LEARNING.md auto-loaded
- ✅ M4.6 Step 1/3: pip install PyJWT, generated 32-byte JWT_SECRET via `secrets.token_urlsafe(32)`, added ADMIN_USERNAME/ADMIN_PASSWORD to .env. Added `LoginIn` Pydantic schema. Wrote `POST /login` route with `secrets.compare_digest` (timing-safe), JWT issuance with sub/iat/exp claims, OAuth 2.0 response shape. Hit `ImportError: cannot import name 'LoginIn'` — wrote the import line in app.py before adding the class to schemas.py (eager import lookup).
- ✅ M4.6 Step 2/3: built `require_auth` decorator using `@functools.wraps` (preserves function metadata), reads Authorization header, decodes JWT with `algorithms=[JWT_ALGO]` allowlist (prevents "none algorithm" attack), branches on ExpiredSignatureError vs InvalidTokenError (specific-before-general MRO again), stores payload on `g.user`. Added `sheets.read_all_leads()` aggregating all 3 tabs. Built `GET /admin/leads` protected route. Hit `NameError: require_auth not defined` — defined the decorator AFTER its usage, Python is top-to-bottom at module level, no forward references.
- ✅ M4.6 Step 3/3: ran `test_auth.py` end-to-end. First run: test 2 returned 500 because the success path of /login was missing (function fell off the end → implicit None → Flask raised TypeError → caught by exception handler → 500). M4.2's structured `unhandled.exception` log would have pinpointed the exact line — observability paying off again. Added the missing JWT issuance block. Re-ran: all 5 tests passed (401, 200, 401, 401, 200). Saw 15 leads pulled from the sheet. Noticed data quality issues in the sheet (header row whitespace, phone stored as int) — schema-on-read vs schema-on-write, a Phase 3 concern.

### 2026-04-30

### 2026-04-30
- Resumed via `i will continue` hook — LEARNING.md auto-loaded
- ✅ M4.4 Step 1/3: pip install flask-limiter (hit DNS bug `getaddrinfo failed` mid-install, debugged via the network-layer-stack mental model: app → HTTPS → TCP → **DNS** → IP → physical; recovered after retry). Updated requirements.txt. Imported Limiter + get_remote_address. Created Limiter instance bound to app + memory:// storage.
- ✅ M4.4 Step 2/3: applied `@limiter.limit("5 per minute")` decorator on /lead (above @app.route — decorator order matters because of function composition). Registered `@app.errorhandler(429)` with WARNING-level `rate_limit.exceeded` log carrying method+path+IP+limit fields.
- ✅ M4.4 Step 3/3: wrote `test_rate_limit.py` (7-request loop), saw 5x 400s + 2x 429s as expected, all rate-limit events logged at WARNING. Watched ALL Flask middleware fire even on error path (request.received → rate_limit.exceeded → request.completed) — proof that lifecycle stages are deterministic regardless of short-circuit. **M4.4 COMPLETE.**
- New teaching rule established: real-world + DSA analogies after each concept (saved as `feedback_realworld_dsa_analogies.md`). Pratik has strong DSA → tying new infra concepts to known data structures (HashMap, deque, function composition, sieve, priority queue, B-tree) gives him fast recall hooks.
- ✅ M4.5 Step 1/3: pip install pydantic, created `backend/schemas.py` with `LeadIn(BaseModel)`, Literal types for hostel/action, Field constraints for name/phone, `extra="forbid"`. Hit two case-sensitivity bugs (`Pydantic` vs `pydantic`, `configDict` vs `ConfigDict`) — same family as yesterday's `logging.logger` → `logging.Logger`. Now memorized: modules lowercase, classes PascalCase, functions/vars snake_case.
- ✅ M4.5 Step 2/3: imported LeadIn + ValidationError into app.py, added `@app.errorhandler(ValidationError)` returning 400 with field-level details + `validation.failed` WARNING log, refactored capture_lead() from 25→7 lines via `lead = LeadIn(**data)`. Removed dead VALID_HOSTELS/VALID_ACTIONS sets — single source of truth lives in schemas.py.
- ✅ M4.5 Step 3/3: ran `test_api.py` — comprehensive integration test of all 5 Phase 2 milestones at once. Tests 4-6 show Pydantic field-level errors with auto-listed valid options; tests 8-9 hit M4.4 rate limit (proof both work together cleanly). **M4.5 COMPLETE.**
- 🔧 Tuning: bumped /lead rate limit from `"5 per minute"` to `"10 per minute"`. 5 was a teaching choice (demo-friendly); 10 is a more realistic real-world limit — tight enough to throttle attackers within seconds, loose enough that thoughtful legitimate users (typo + resubmit) never trip it. Tradeoff curve: lower = more secure + more false positives; higher = more permissive + more attack capacity. Tune to ~2-3× expected peak legitimate rate.

### 2026-04-29
- Resumed via `i will continue` hook — LEARNING.md auto-loaded
- ✅ M4.3 Step 1/3: imports (`time`, `g`) + `@app.before_request` handler stamping `g.start_time` and logging `request.received`
- ✅ M4.3 Step 2/3: `@app.after_request` handler with defensive `hasattr` check, computing `duration_ms` and logging `request.completed`
- ✅ M4.3 Step 3/3: smoke-test happy path. Hit two debugging snags: (a) forgot to add `@app.before_request` / `@app.after_request` decorators above the functions — Flask treats decorator-less functions as orphans (file imports fine, handlers never fire — "loads OK ≠ works"); (b) typo `g.start.time` instead of `g.start_time` — got caught by the structured exception log immediately because M4.2's traceback in JSON pointed at the exact line. **M4.3 COMPLETE.** Observed 1.5ms for `GET /` vs 2552ms for `POST /lead` — first concrete I/O-dominates-everything demonstration.

### 2026-04-28
- Set up `i will continue` UserPromptSubmit hook → auto-loads LEARNING.md at start of each session
- Set up progress-footer system: feedback memory + `project_current_milestone.md` so phase/milestone/step is tracked across sessions
- Phase 2 milestones tracked as TaskList tasks (M4.1 done, M4.2 in progress, M4.3-M4.6 pending)
- ✅ M4.2 Step 1/3: created `backend/logger.py` with `JsonFormatter` + `configure_logging()` + `get_logger()`. Hit 4 paste/typo bugs (extra quote in docstring, `isformat` typo, indentation drift on payload `}`, lowercase `logger` instead of `Logger` class) — useful Python lesson on case-sensitivity + indent-as-syntax.
- ✅ M4.2 Step 2/3: wired 4 edits into `backend/app.py` (import + configure_logging at module top + log.info on lead.captured + log.exception in handle_unexpected). Verified `python -c "import app; print('app.py loads OK')"` passes.
- ✅ M4.2 Step 3/3: smoke-tested happy path (3 `lead.captured` JSON lines emitted as test_api.py ran), fault-injected via temporary `/boom` route that raised ValueError → captured full traceback in JSON `exc` field → cleaned up `/boom`. **M4.2 COMPLETE.**
- Mid-session debugging wins: hit a `ConnectionRefusedError` (forgot to restart server after editing) — refresher on the M1.5 distinction between `ConnectionError` (nothing listening) vs HTTP 500 (server up, code crashed). Then hit `IndentationError` on `/boom` route from indented decorator + indented `def` (decorators don't open new indent blocks) — fixed by aligning decorator + def at column 0 with body indented one level.
- Learned: 4-piece logging architecture (Logger → LogRecord → Handler → Formatter), why JSON beats plaintext at scale, what `extra={}` does, why `log.exception()` auto-attaches tracebacks, why class names are PascalCase (`Logger`) but module names are lowercase (`logging`)

---

### Session 6+ status — Phase 2 started 2026-04-27

**Phase 2 milestones (Backend Deep Dive):**
- ✅ M4.1: Error handler middleware (404/405/500/Exception → consistent JSON) — DONE 2026-04-27
- ✅ M4.2: Structured logging (Python logging + JSON formatter) — DONE 2026-04-28. Built `backend/logger.py` with `JsonFormatter` + `configure_logging()` + `get_logger()`. Wired into `app.py`: configure at module top, `log.info("lead.captured", extra={...})` on success, `log.exception("unhandled.exception")` in error handler. Verified end-to-end with happy-path smoke test (3 lead.captured events from test_api.py) and fault injection (temporary `/boom` route raised ValueError → captured full traceback in JSON `exc` field, then removed).
- ✅ M4.3: Request/response logger middleware — DONE 2026-04-29. Added `import time` + `g` to imports, then `@app.before_request` (stamps `g.start_time`, logs `event: "request.received"` with method+path) and `@app.after_request` (computes `duration_ms` defensively via `hasattr`, logs `event: "request.completed"` with method+path+status+duration). Verified end-to-end: 1-1.5ms for in-memory routes (`/`, `/hostels`), **2552ms for `/lead`** because of Google Sheets network round-trip — concrete demonstration of "I/O dominates everything" principle.
- ✅ M4.4: Rate limiting (flask-limiter) — DONE 2026-04-30. Installed flask-limiter 4.1.1, created `Limiter(key_func=get_remote_address, app=app, storage_uri="memory://")`, applied `@limiter.limit("5 per minute")` to /lead, registered `@app.errorhandler(429)` that emits `event: "rate_limit.exceeded"` at WARNING level with method+path+IP+limit. Smoke-tested with `test_rate_limit.py` (loop sending 7 requests) — first 5 returned 400 (validation), 6-7 returned 429 (limit). Cheap rejection: 2.23ms vs 2552ms for real /lead (~1100× faster — the whole point of edge defense). Bonus: flask-limiter's own logger automatically emits as JSON because root logger was configured in M4.2 (compound benefit of good architecture).
- ✅ M4.5: Pydantic input validation — DONE 2026-04-30. Installed pydantic 2.x, created `backend/schemas.py` with `LeadIn(BaseModel)` using `Literal` types for hostel + action allowlists, `Field(min_length, max_length)` for name/phone, `model_config=ConfigDict(extra="forbid")` for strict whitelist. Refactored `capture_lead()` to one-line `lead = LeadIn(**data)`. Removed dead `VALID_HOSTELS`/`VALID_ACTIONS` sets. Added `@app.errorhandler(ValidationError)` that emits `event: "validation.failed"` at WARNING level with `error.errors()`, returns 400 with `details: [{field, issue}]`. Verified end-to-end via `test_api.py`: missing fields, wrong hostel, invalid action all return field-level structured 400s; the Literal types AUTO-DOCUMENT the valid options in the error message ("Input should be 'Muskan...' or 'Sanskriti...' or 'Sankalp...'"). Pydantic catches bugs old code missed (integer-as-name, oversized strings, extra fields).
- ✅ M4.6: JWT auth + GET /admin/leads — DONE 2026-05-02. Installed PyJWT, generated 32-byte URL-safe JWT_SECRET, added ADMIN_USERNAME + ADMIN_PASSWORD to .env. Built `LoginIn` schema. Built `POST /login` (rate-limited 10/min, validates with Pydantic, uses `secrets.compare_digest` for timing-safe credential check, issues HS256 JWT with sub/iat/exp claims, OAuth 2.0 response shape with access_token/token_type/expires_in). Built custom `@require_auth` decorator using `functools.wraps` — reads `Authorization: Bearer <token>`, decodes via `jwt.decode(... algorithms=[JWT_ALGO])` (allowlist prevents "none algorithm" attack), branches on ExpiredSignatureError / InvalidTokenError (specific before general per MRO). Added `sheets.read_all_leads()` reading all 3 tabs and annotating each row with `hostel`. Built protected `GET /admin/leads`. Smoke-tested 5-case auth flow: wrong creds 401 ✓, right creds → token ✓, no token 401 ✓, garbage token 401 ✓, valid token → 200 with 15 leads ✓. Audit log `admin.leads.viewed` fires per access. Hit + fixed 4 bugs along the way: missing LoginIn class, definition-order error (decorator used before defined), implicit-return-None on success path (M4.2's exception logging caught it instantly), copy-paste duplicate except + wrong message text.

🏆 **PHASE 2 COMPLETE 2026-05-02** — Hardened backend with login, rate limits, JSON logs, error handlers, structured validation, full audit trail. The endpoint that started M1 as `print("got lead: ...")` is now a real production-quality API surface.
- M4.4: Rate limiting (flask-limiter) — protect /lead from spam
- M4.5: Pydantic for input validation
- M4.6: JWT auth + GET /admin/leads endpoint

**Resume from here (current as of 2026-04-28, mid-Step-2):**

✅ **M4.2 COMPLETE 2026-04-28.** All three sub-steps done. Final state of code: `backend/logger.py` (new file, JsonFormatter + helpers); `backend/app.py` updated with import, configure_logging(), log.info on success, log.exception on error. Happy path verified, fault injection verified, cleanup done.

**Next up — M4.3: Request/response logger middleware.**

Plan (provisional, refine at kickoff):
1. Add `@app.before_request` handler that records `request.start_time = time.time()` on the `g` (request-scoped global) object, then logs `event: "request.received"` with method + path
2. Add `@app.after_request` handler that computes `latency_ms = (time.time() - g.start_time) * 1000` and logs `event: "request.completed"` with status code + duration
3. Run `test_api.py`, verify both events appear per request, with sane latency numbers (sub-millisecond for /, much longer for /lead which round-trips to Google Sheets)

This builds directly on M4.2 — same JSON formatter, just adding two more event types.

**Important reminders for AI:**
- PowerShell's `curl` is an alias for `Invoke-WebRequest` — different syntax. Use `curl.exe` or `python -c "import requests; ..."`. User hit this trap on 2026-04-27.
- `test_api.py` lives in `backend/`, not repo root. Always `cd backend` before running.

---

## 🔭 Future: Project 2 Roadmap

User asked on 2026-04-27 to plan a deeper second project that uses everything from Project 1 plus heavy infrastructure (load balancers, nginx, multi-tenancy, ML at scale). The full plan is saved at:

**📄 `E:\HOTEL WEB\PROJECT2_ROADMAP.md`**

Working title: **"StaySense"** — multi-tenant hostel/PG recommendation platform with per-tenant RAG chatbots. ~5 months, planned start late 2026 after Project 1 Phase 5 finishes. Two alternative projects also documented inside (DocSense / PriceProphet / EduMatch).

When Project 1 wraps, read that file → decide → kick off Project 2.

🎯 **Phase 1 checkpoint:** Site live at your own domain, capturing real leads (May 2026)

### Phase 2 — Backend Deep Dive (~3 weeks)
- [ ] Middleware (Flask `@before_request`, `@after_request`, error handlers)
- [ ] Custom middleware from scratch — request logger, rate limiter, simple auth
- [ ] JWT authentication for admin endpoints
- [ ] Rate limiting (Flask-Limiter)
- [ ] Structured logging (stdlib `logging` + JSON formatter)
- [ ] Proper error handling — 4xx vs 5xx, consistent error shape
- [ ] Input validation (marshmallow or pydantic)

🎯 **Phase 2 checkpoint:** Hardened backend with login, rate limits, logs (June 2026)

### Phase 3 — Database + System Design (~5 weeks)
- [x] **M5.1:** Postgres install + create project DB ✅ COMPLETE 2026-05-02 — Postgres 18.3 installed at `C:\Program Files\PostgreSQL\18`, service `postgresql-x64-18` running, bin added to user PATH, `lalpur_hostels` database created. Master postgres password saved on paper.
- [x] **M5.2:** SQLAlchemy ORM — models, relationships, queries ✅ COMPLETE 2026-05-07 — `Hostel` + `Lead` models with FK + cascade + indexed FK + timestamptz `created_at`. Dual-write `capture_lead` (env-flagged postgres/sheets/both, fail-fast config). Dual-read `/admin/leads` (env default + `?source=` override, JOIN to Hostel via `joinedload` so no N+1, source-tagged provenance). Smoke-tested all 4 modes including the `bogus` 400 path. Schema-on-write benefits made visible side-by-side with sheets schema-on-read mess (whitespace-poisoned keys, type coercion destroying phone numbers, "Actioned" as string instead of boolean).
- [x] **M5.3:** Alembic migrations ✅ COMPLETE 2026-05-07 — `alembic.ini` + `migrations/env.py` wired (sys.path insertion, .env load, `import models` for metadata side-effect, `create_engine(DATABASE_URL)` directly to bypass configparser %-interpolation gotcha). First migration `a3d3de76dd03_initial_schema.py` autogenerated and applied. Schema now reproducible from version control via `alembic upgrade head`.
- ❌ **M5.4:** ~~Schema design for rooms, bookings, users~~ — **DROPPED 2026-05-07** (YAGNI). Pratik confirmed product scope: lead-capture + admin portal for 3 hostels he already runs. Existing `Hostel` + `Lead` schema covers real needs.
- [ ] **M5.5:** Data migration from Google Sheets → Postgres (still relevant — backfill the existing 30 sheet rows into Postgres so admin portal sees full history)
- [ ] **M5.7:** Indexes, EXPLAIN plans, N+1 problem (worth a session once we have data)
- ⏸ **M5.6/M5.8:** Redis caching + observability basics — deferred until traffic justifies them.

🎯 **Phase 3 checkpoint (revised):** Real typed DB with versioned migrations, plus full historical lead data migrated in.

### Phase 4 — Admin Portal Backend (NEW — replaces old Phase 4 distributed-systems plan in admin-portal scope)
- [x] **M6.1:** `PATCH /admin/leads/<id>` ✅ COMPLETE 2026-05-11 — mark actioned + edit remarks, auth-gated, audit-logged, validation + 404 + partial-update via `exclude_unset`, all 5 paths tested against prod Render Postgres
- [ ] **M6.2:** `GET /admin/stats` — per-hostel counts (total / actioned / pending) via SQL `GROUP BY`
- [ ] **M6.3 (optional):** Lead history audit table — track who changed what when

### Phase 5 — Admin Portal Frontend (NEW)
- [ ] **M7.1:** Next.js admin login page → POST `/login` → store JWT → redirect dashboard
- [ ] **M7.2:** Dashboard with per-hostel tabs, lead table, action toggle, remarks inline edit (calls PATCH M6.1)
- [ ] **M7.3:** Stats cards on dashboard (calls M6.2), polish + deploy to Vercel

🎯 **Admin portal checkpoint:** You log into your own dashboard from your phone and update lead status during a call.

### Phase 6 — Distributed Systems (~4 weeks) — DEFERRED until admin portal is shipped
- [ ] Celery + Redis as message broker
- [ ] Async tasks (send WhatsApp confirmation, generate reports)
- [ ] Scheduled jobs via Celery Beat (daily unactioned leads digest, weekly reports)
- [ ] Retry policies, dead-letter queues
- [ ] Monitoring: Prometheus-style metrics or simpler (Grafana Cloud free tier)
- [ ] Idempotency and eventual consistency concepts

🎯 **Phase 6 checkpoint:** Background jobs running, auto-reports to you

### Phase 5 — GenAI Deep Dive (~8 weeks) — THE BIG ONE
- [ ] LLM API basics: Claude/OpenAI/Gemini client libraries
- [ ] Prompt engineering — system prompts, few-shot, structured output
- [ ] Simple chatbot on hostel site (answers generic questions)
- [ ] Function calling / tool use — chatbot can query hostel data live
- [ ] Embeddings: what they are, OpenAI/Cohere/local models
- [ ] Vector DB: Chroma (local) first, then Pinecone/Weaviate
- [ ] **RAG pipeline** — chunking strategies, retrieval quality, re-ranking
- [ ] RAG over hostel policy docs, rental agreements, FAQs
- [ ] Agent loops — multi-step reasoning, planner + executor pattern
- [ ] Evaluation: how to know your RAG is good (golden datasets, LLM-as-judge)
- [ ] Guardrails: prompt injection defense, PII filtering
- [ ] WhatsApp Business API integration — webhook handler + AI auto-reply

🎯 **Phase 5 checkpoint:** AI-powered hostel site with chatbot, RAG, WhatsApp agent (October 2026)

### Phase 6 — Productization (~2-3 weeks)
- [ ] Admin dashboard (new Next.js app) — view leads, AI insights, analytics
- [ ] AI-generated daily summary on dashboard
- [ ] Role-based access (you vs staff)
- [ ] Polish, bug bash, documentation

🎯 **Phase 6 checkpoint: FULL PRODUCT DONE (November 2026)** 🏆

---

**Total: ~135 hours = ~24 weeks (6-7 months at 6 hrs/week)**

**Middleware teaching plan** (woven across phases):
- M2: First touch — `flask-cors` as example of middleware (~5 min)
- Phase 2: Custom middleware deep-dive (logger, rate limiter, auth)
- Phase 2 → optional Express detour: middleware as core architecture

---

## Session log

### Session 1 — 2026-04-22
**Status:** Phase 1, Milestone 1 in progress.

**Decisions made:**
- Python + Flask for backend
- Next.js existing site will become the frontend that calls the backend
- 6 hrs/week
- Learn-by-doing style: user types code, AI guides + explains
- First real feature = lead capture system (popup when user clicks Call/WhatsApp → POST to Flask → write to Google Sheets). 3 sheet tabs for Muskan/Sanskriti/Sankalp hostels with columns: time, name, phone, action, actioned?, remarks.

**Completed:**
- ✅ **M1.1** — Created `backend/` folder, set up Python 3.11 venv at `backend/venv/`, activated it. Verified `python --version` = 3.11.9 inside venv.
- ✅ Updated `.gitignore` to exclude `backend/venv/`, Python caches, and future credentials/secrets.
- ✅ **M1.2** — Installed Flask 3.1.3 in venv. Wrote first `app.py` with two routes: `GET /` (health check) and `GET /hostels` (list of 3 hostel names). Fixed initial typo `--name--` → `__name__`. No errors.
- ✅ Fixed PyCharm interpreter to point at `backend/venv/Scripts/python.exe` (not Anaconda's 3.10).
- ✅ Learned: `mkdir` makes folders not files — use IDE "New File" for files; venv isolation means global installs don't count; dunder `__name__` is a built-in Python variable.

- ✅ **M1.3** — Ran `python app.py`, visited `http://localhost:5000/` and `/hostels` in browser, saw JSON responses. First real web server running end-to-end.
- ✅ **M1.4** — Built `POST /lead` endpoint with full validation: missing fields, unknown hostel allowlist, unknown action allowlist, non-JSON body rejection. Proper 400/201 status codes. Wrote `backend/test_api.py` using the `requests` library with 7 test cases — all passing. PyCharm Community Edition doesn't have built-in HTTP Client (Pro-only), so went with Python `requests` — better learning anyway.
- ✅ **M1.5** — Lead capture is now LIVE. Set up Google Cloud project `lalpur-hostels-backend`, enabled Sheets + Drive APIs, created service account `hostel-bot` with JSON key stored in `backend/credentials.json` (gitignored). Shared sheet with service account as Editor. Installed `gspread` + `python-dotenv`. Created `backend/.env` with `SHEET_ID`. Wrote `backend/sheets.py` module with `append_lead()` helper using `Credentials.from_service_account_file` + `gspread.open_by_key` + `worksheet.append_row`. Replaced `print(...)` in `capture_lead()` with `sheets.append_lead(...)`. Tested with inline `python -c` command — real row appeared in Muskan Girls Hostel tab with all 6 columns populated (timestamp, name, phone, action, "NotActioned" default, empty remarks).

- ✅ **M1.6** — Final verification pass. Extended `test_api.py` from 7 to 9 tests by adding valid-lead cases for Sanskriti (Priya Kumari) and Sankalp (Amit Raj). All 9 tests green. Rows verified in all 3 sheet tabs (Muskan / Sanskriti / Sankalp). No failing test creates a row (wrong hostel and invalid action bail early with 400 before reaching `sheets.append_lead`).

### 🏆 M1 COMPLETE (2026-04-23)

**Lead capture system summary:**
- Flask backend with `GET /`, `GET /hostels`, `POST /lead` endpoints
- Validation allowlist for 3 hostels + 2 actions (call/whatsapp)
- Writes timestamped row to correct Google Sheet tab with `NotActioned` default
- Service account + JSON credentials (gitignored) for secure auth
- `.env` file for config (SHEET_ID), gitignored
- 9 automated test cases via `test_api.py`
- Clean separation: `app.py` (HTTP layer) + `sheets.py` (data layer)

**Files in `backend/`:**
```
app.py              — HTTP routes + validation
sheets.py           — Google Sheets integration
test_api.py         — 9 automated tests
requirements.txt    — Flask, gspread, python-dotenv, requests, + deps
.env                — SHEET_ID (gitignored)
credentials.json    — service account key (gitignored)
venv/               — Python 3.11 venv (gitignored)
```

**What's next (M2 — tomorrow):** Connect Next.js frontend to Flask backend. Build a lead-capture popup component that intercepts Call/WhatsApp button clicks, collects name+phone, POSTs to `/lead`, then opens the actual `tel:` or `wa.me/...` URL. Introduces: React `useState`, controlled forms, `fetch`/`axios`, **CORS + middleware concept** (user explicitly asked to learn middleware). See "Middleware teaching plan" at top of file for how middleware is woven across Phase 1-2.

### Session 4 — 2026-04-25 (partial)
**Status:** M2.2 nearly done — Build error resolved, awaiting visual confirmation that all 4 buttons trigger modal.

**Completed:**
- ✅ Created `src/components/HostelContactButtons.tsx` — client component with `useState<"call" | "whatsapp" | null>(null)`, `variant` prop ("header" | "sidebar"), conditional Tailwind classes per variant, renders 2 buttons + LeadCaptureModal as fragment.
- ✅ All 3 edits to `src/app/hostel/[id]/page.tsx`:
  - Edit 1 (line 18): import added
  - Edit 2 (line 221): sticky header buttons replaced with `<HostelContactButtons variant="header" />`
  - Edit 3 (line 342): sidebar booking buttons replaced with `<HostelContactButtons variant="sidebar" />`
  - Staff contact list (line 349 onwards) untouched per Option A choice.
- ✅ Debugged 2 real-world errors via Next.js build error screen:
  - "Module not found" (HostelContactButtons.tsx had not been created — gave them code, they pasted it)
  - "Unterminated string constant" (long className string was broken across lines — fixed by joining lines)
- ✅ Taught: how to find code to change in a real codebase (`grep` for unique strings like `tel:`/`wa.me`, read context, map to UI), why strings can't span lines without backticks/concat, why "Module not found" means the file doesn't physically exist where the import says.

**Resume from here next session:** Have user verify all 4 buttons (top header WhatsApp+Call, sidebar Book via WhatsApp + Call to book) trigger modal with correct hostel name. If yes → mark M2.2 complete, move to M2.3 (form validation). If no → debug the failing button.

### Session 3 — 2026-04-24 (partial)
**Status:** M2 started. M2.1 complete.

**Decisions made:**
- Option A chosen for lead capture scope: ONLY hostel detail page buttons (sticky top + booking sidebar) trigger modal. Floating WhatsApp + individual staff phone links stay direct. Reason: reduce friction fatigue, capture at high-intent moments.

**Completed:**
- ✅ **M2.1** — Built `src/components/LeadCaptureModal.tsx` — a React client component with props (isOpen, onClose, hostelName, action), useState for name+phone, controlled inputs, backdrop click-to-close, X button, ternary for Call vs WhatsApp icon (Phone/MessageCircle from lucide-react), form submit placeholder (`console.log("TODO: submit", ...)`). Built temporary test page at `src/app/test-modal/page.tsx` with Test Call / Test WhatsApp buttons. Verified in browser at http://localhost:3000/test-modal — modal opens, state flows (typed text appears in inputs), icons switch, backdrop closes, all 4 initial typos fixed (lucide-react casing, curly braces in JSX interp, `Phone` vs `phone` shadowing, `e.target` typo).
- Debugged 4 common React/JSX typos live via the Next.js build-error page — user learned the error-driven development workflow.

**What's next (M2.2 tomorrow):** Delete the test page, then wire the modal into the actual hostel detail page (`src/app/hostel/[id]/page.tsx`). That page has 2 sets of Call/WhatsApp buttons (sticky top header + booking sidebar) — both need to open the modal with correct hostel context + action. Will need to make the page a client component (add `"use client"`) or split into client+server parts.

**Known polish items (fix later):**
- Line 22: `"call"` should be `"Call"` for consistent capitalization in button label.
- Indentation in LeadCaptureModal.tsx is slightly inconsistent — run Ctrl+Alt+L to auto-format.

### How to resume next session (READ THIS FIRST)

**User's opening message will be something like** *"let's continue"* / *"resume"* / *"what were we doing"*.

**What to do, in order:**

1. **Read this whole journal file.** The checklists + "What's next" tell you where we are.
2. **Verify the environment is still healthy** before resuming:
   ```bash
   ls "E:/HOTEL WEB/backend/"   # should show: app.py, sheets.py, test_api.py, requirements.txt, venv, .env, credentials.json
   ls "E:/HOTEL WEB/src/"       # should show the Next.js app
   ```
3. **Warmly greet the user and recap in one line** what they finished last session + what's next. Don't re-explain things they already learned (check "Concepts learned" below before explaining any term).
4. **Start M2** — Frontend integration (Next.js → Flask). Plan:
   - M2.1: Build lead-capture popup component with React `useState`
   - M2.2: Wire Call/WhatsApp buttons to open popup
   - M2.3: Controlled form (name + phone) with client-side validation
   - M2.4: POST to Flask `/lead` via `fetch` or `axios`
   - M2.5: **Enable CORS** on Flask (`pip install flask-cors`) — this is where we introduce **middleware concept** (user explicitly asked to learn this)
   - M2.6: On success → open `tel:` or `wa.me/` URL
   - M2.7: End-to-end test in browser
   - M2.8: UX polish (loading state, error toast)

**For the user — how to get your machine back to working state:**

1. Open PyCharm → `E:\HOTEL WEB` project
2. Verify bottom-right shows `Python 3.11 (HOTEL WEB)` (the venv). If not, point it back at `E:\HOTEL WEB\backend\venv\Scripts\python.exe`.
3. Open PyCharm's built-in terminal (bottom → Local tab). Should show `(venv)`. If not:
   ```bash
   cd "E:/HOTEL WEB/backend"
   venv\Scripts\Activate.ps1    # PowerShell — or: source venv/Scripts/activate for bash
   ```
4. Sanity check the backend still works:
   - Terminal 1: `python app.py` (leave running)
   - Terminal 2 (new one via `+`): `python test_api.py` — all 9 tests should pass
5. For Next.js dev server (we'll use this in M2):
   - New terminal at repo root (`E:\HOTEL WEB`) — NOT inside backend
   - `npm run dev` — starts Next.js on `http://localhost:3000`
   - Flask will still be on `:5000`; both run in parallel

---

## Current state of code (as of end of Session 2 — M1 complete)

### `backend/app.py`
Three routes: `GET /`, `GET /hostels`, `POST /lead`. `/lead` validates 4 required fields, allowlists 3 hostels + 2 actions (call/whatsapp), returns proper 400 for bad input, 201 for success. On success calls `sheets.append_lead(hostel, name, phone, action)` which writes a row to the matching sheet tab.

### `backend/sheets.py`
Google Sheets module. `_get_client()` caches an authorized `gspread` client using `credentials.json`. `append_lead(hostel, name, phone, action)` opens sheet by `SHEET_ID` from env, selects worksheet by hostel name, appends `[timestamp, name, phone, action, "NotActioned", ""]`.

### `backend/test_api.py`
9 test cases using `requests`: health, hostel list, valid Muskan lead, missing fields, wrong hostel, invalid action, not-JSON, valid Sanskriti lead, valid Sankalp lead. All 9 passing as of end of Session 2.

### `backend/requirements.txt`
Flask, requests, gspread, python-dotenv, google-auth (+ transitive deps).

### `backend/.env` (gitignored)
`SHEET_ID=1qmeTKsc5p3epssvdU9RImPVTTWddoLf_Dk3GwcCOJNE`

### `backend/credentials.json` (gitignored)
Google service account JSON key. Robot email: `id-hostel-bot@lalpur-hostels-backend.iam.gserviceaccount.com`. Shared with sheet as Editor.

### `backend/venv/` (gitignored)
Python 3.11.9 venv with everything installed.

### Next.js frontend (existing from before our work)
Lives at repo root — `src/app/`, `src/components/`, `src/data/hostels.ts`. Runs with `npm run dev` → `localhost:3000`. In M2 we'll add a lead-capture modal + wire it to Call/WhatsApp buttons.

### Google Sheet
`lalpur hostels sheet` at sheet ID above. 3 tabs: `Muskan Girls Hostel`, `Sanskriti Girls Hostel`, `Sankalp Boys Hostel`. Each tab: 6 columns (Timestamp, Name, Phone, Action, Actioned, Remarks). Column E has dropdown validation: `Actioned` / `NotActioned` / `some other issue`. Backend writes `NotActioned` as default.

---

## Concepts learned (vocabulary Pratik now knows — DO NOT re-teach these)

**From Session 1:**
- **Virtual environment (venv)** — per-project private toolbox for Python packages; keeps versions from conflicting across projects.
- **`pip`** — Python's package installer; installs into the active venv.
- **Activating a venv** — switches your terminal to use the project's private toolbox. Visible by `(venv)` prefix on the prompt.
- **`.gitignore`** — tells git to ignore certain paths. Use for anything big, machine-specific, re-generatable, or secret.
- **`**/` wildcard in .gitignore** — matches any depth of nested folders.
- **Secrets rule** — never commit `.env`, credentials, or API keys. Once pushed, assume leaked forever; rotate the credential.
- **`mkdir` makes folders, not files** — use IDE's "New File" option for files; `touch` (bash) or `New-Item` (PowerShell) from terminal.
- **Dunder `__name__`** — Python built-in variable. Equals `"__main__"` when file is run directly, the module name when imported.
- **Flask basics** — `@app.route("/path")` decorator registers a URL → function mapping. Return a dict and Flask auto-JSONs it. `app.run(debug=True, port=5000)` starts a dev server.
- **`localhost` / `127.0.0.1`** — "this very computer". **Port** — a numbered "door" on the machine; one program per port.
- **HTTP methods** — GET reads (data in URL), POST creates (data in body). PUT, PATCH, DELETE exist too.
- **HTTP status codes** — 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 405 Method Not Allowed, 500 Internal Server Error.
- **Request body** — the data chunk sent with POST/PUT. `request.get_json(silent=True)` in Flask parses it safely.
- **`jsonify()` + status tuple** — `return jsonify({...}), 201` is Flask's way to set JSON body + HTTP status.
- **Input validation** — never trust client data; always check presence of fields, allowlist known values (use `set` for O(1) membership check).
- **`requests` library (Python)** — HTTP client for making requests from Python code. `.get(url)`, `.post(url, json={...})`. Pass `json=` (not `data=`) to auto-serialize + set Content-Type header.
- **`python -c "..."`** — run a one-off Python command inline without creating a file. Use `;` to separate statements. Good for quick debugging; use `.py` files for real scripts.
- **Separation of concerns** — split logic into modules (`app.py` = HTTP layer, `sheets.py` = data layer). Caller uses the module without knowing its internals.
- **`__file__`** — Python built-in = path to the current `.py` file. Useful to build paths relative to a module (e.g., `os.path.dirname(os.path.abspath(__file__))`).
- **Module-level caching with `global`** — declare a variable at module scope as `None`, initialize on first use, reuse thereafter. Avoids expensive re-auth on every call. Leading `_` = convention for "private, don't touch".
- **Environment variables + `.env`** — store config/secrets outside code. `load_dotenv()` (from `python-dotenv`) reads `.env` and populates `os.environ`. `os.environ["KEY"]` reads a value. Platform deploys work the same way — just set env vars in the platform's UI.
- **`python-dotenv` vs `dotenv`** — install name is `python-dotenv`, import name is `dotenv`. Common mismatch pattern in Python libraries.
- **Service account (Google Cloud)** — a robot Google user with its own email + JSON credentials. Used by backend code to access Google services (Sheets, Drive, etc.) without using your personal account. Principle of least privilege — share only specific resources with it.
- **Scopes** — permission tags in OAuth. We requested `spreadsheets` + `drive` scopes — robot can only do those things.
- **`gspread` library** — Python wrapper around Google Sheets API. `open_by_key(id)` → spreadsheet, `.worksheet(name)` → tab, `.append_row([...])` → new row at bottom.
- **ConnectionError vs 500** — ConnectionError = nothing listening; 500 = server up but crashed. Fundamentally different diagnoses.
- **`Ctrl+Alt+L` in PyCharm** — auto-format code to PEP 8 style.
- **Debug mode auto-reload** — `debug=True` makes Flask restart when you save `app.py`.

**From M4.2 (Structured logging — 2026-04-28):**
- **Python `logging` 4-piece architecture** — Logger (the thing you call) creates a LogRecord (structured object) which a Handler (decides where) hands to a Formatter (decides how to serialize). One config affects every module via the **root logger** at the top of the tree. Universal pattern across every language's logging library.
- **`LogRecord`** — not a string, an *object* with attributes (level, timestamp, message, exc_info, plus anything you attached via `extra={}`). The structure-not-string nature is what makes JSON logging possible.
- **`extra={}` on log calls** — standard way to attach structured fields. They land in `record.__dict__` so a custom formatter can pull them out.
- **`logging.Formatter` subclassing** — override `format(record)` to control the output. We built `JsonFormatter` that walks `record.__dict__`, skips Python's reserved keys, embeds `formatException(record.exc_info)` if present, and `json.dumps(payload, default=str)` for safety against unserializable values.
- **JSON-structured logging vs plaintext** — JSON logs are filterable, aggregatable, stable, and machine-friendly. Industry default at every real-world backend (Stripe, Datadog, Netflix). Plaintext logs are the kind of thing that breaks the moment you have real volume.
- **Event-name style** (`event: "lead.captured"`, `event: "unhandled.exception"`) — short dotted names instead of human sentences. Easy to filter on, stable across UI text changes, mirrors REST endpoint paths.
- **Module-level initialization (side effects on import)** — Python executes a module's top-level code top-to-bottom on first import. Statements outside any function run *at import time*, exactly once. Order on the page = order at runtime.
- **`__name__` again** — equals `"__main__"` when run directly, the module name when imported. Using `get_logger(__name__)` makes log lines self-identify their source module.
- **`log.exception()` vs `log.error()`** — same level (ERROR), but `.exception()` automatically attaches the current traceback (via `sys.exc_info()`). Only meaningful inside an `except` block. Flask error handlers run inside an active except, so it works there.
- **PII rule (Personally Identifiable Information)** — log the operation, not the user data. We log `hostel` + `action` (operation context), not `name` or `phone` (PII). Logs leak everywhere — log aggregators, support screenshots, archived files. Anything PII'd in logs is a compliance risk (GDPR, India's DPDP).
- **Observability event** — a log line meant to be queried in aggregate, not just read one by one. Different intent than a debug print. The whole structured-logging movement is built on this.
- **Smoke test** — running the system end-to-end after a code change to verify nothing's obviously broken. Catches 80% of integration bugs cheaply. Different from unit tests (one function in isolation) — smoke tests check the whole machine.
- **Fault injection** — deliberately triggering errors to verify your error paths actually work. We added `/boom` raising ValueError, hit it, watched the exception handler + log fire, then removed `/boom`. Real companies do this at scale (Netflix's Chaos Monkey).
- **`ValueError` vs `Exception`** — raise the most specific exception that fits the situation. Generic `Exception` is too broad; `ValueError`/`KeyError`/`TypeError`/`RuntimeError` etc. signal what kind of problem occurred. Makes downstream catching cleaner.
- **Decorators don't open indentation blocks** — `@something` and the `def` it decorates must be at the same indentation level. The decorator is just a label on the next line, not a block opener.
- **Cleanup discipline** — temp diagnostic code (debug routes, print statements, commented blocks) must be removed the moment it's served its purpose. Strongest signal of a senior engineer is *what they remove*.
- **Separation between user-facing safety and operator-facing forensics** — the user gets a clean generic JSON 500; the operator (you) gets a full traceback with line numbers in the JSON log. Both are correct simultaneously. The most fundamental pattern in production backend design.

**From M4.3 (Request/response logger middleware — 2026-04-29):**
- **Middleware (proper definition)** — code that runs before/after every request, regardless of which route handles it. Used for cross-cutting concerns (auth, logging, rate limiting, CORS) so you don't copy-paste them into every route handler.
- **Flask request lifecycle** — `@app.before_request` → route handler → `@app.after_request` → response sent. Multiple before/after handlers run in registration order. `@app.teardown_request` runs even on failure, for cleanup.
- **Decorator IS the registration** — `@app.before_request` is syntactic sugar for `func = app.before_request(func)`. The call to `app.before_request(...)` is what stores your function in Flask's middleware list. Without the decorator, the function is just an orphan that never fires. Critical mental model: decorators in Flask aren't decoration, they're how the framework finds your code.
- **"Loads OK ≠ works"** — `python -c "import app"` only proves syntax is valid. It does NOT prove logic works. Compile-time vs runtime checks. Smoke testing — actually exercising the code path — is the only way to catch missing-decorator bugs and other silent logic failures.
- **Flask's `g` object (per-request global)** — request-scoped storage that's safe under concurrent load. Each incoming request gets its own fresh `g`. Module-level variables would be clobbered by concurrent requests; `g` solves this. Combined with the request-scoped `request` object, these are the two main per-request globals in Flask.
- **Scope (module / function / request)** — defines how long data lives. Module scope = until process exits. Function scope = until function returns. Request scope = until that one HTTP request finishes. Choosing the right scope is critical for correctness under concurrency.
- **`time.time()`** — returns Unix timestamp as a float (seconds since 1970 UTC). The number alone is meaningless; the *difference* between two of them is what you want — elapsed time. Multiply by 1000 for milliseconds.
- **`hasattr(obj, "name")` / `getattr(obj, "name", default)`** — defensive checks for whether an attribute exists. Tradeoff: more robust but more lines and can mask real bugs. Right answer depends on context (e.g., logging code should never crash → use guards; business logic where missing data IS a bug → let it raise).
- **`after_request` "must return response"** — Flask passes the response in, expects the same (or a modified) response back. Forgetting `return response` raises `TypeError: did not return a valid response`. Memorize: every after_request ends with `return response`.
- **Three pillars of observability — counts, errors, latency** — every monitoring system in the world is essentially a UI over these three signals. M4.2 gave us errors. M4.3 gave us counts (request.received) and latency (duration_ms). Datadog/Grafana/Prometheus are nice-looking dashboards built on top of this same triad.
- **Event pairs (start/end events)** — `request.received` + `request.completed`, `db.query.started` + `db.query.completed`, `payment.initiated` + `payment.settled`. Why two events? The "started" event tells you a thing is happening (catches hangs that never finish). The "completed" event tells you how it ended (status + duration). Together = full visibility.
- **Self-contained events** — every log event must carry enough context (method, path) to be filterable alone. Don't rely on grep'ing across multiple events to reconstruct meaning. This is the rule of structured logging.
- **Latency floor** — even empty endpoints cost ~1ms in Python+Flask on localhost. Below that floor is impossible without changing language/framework. You optimize *above* the floor.
- **I/O dominates everything** — measured firsthand: GET / = 1.5ms, POST /lead = 2552ms. ~1700× gap, all from one network round-trip to Google Sheets. The single most important rule in backend performance — caches, async, batching, indexes, CDNs, all exist because of this. Phase 3's Postgres migration will reduce /lead latency by ~1000× by removing this network hop.
- **Stale terminal output debugging trap** — when code changes but test results don't, ask: "am I actually running the new code?" Three things must be true: file saved (no asterisk on tab), server reloaded, test re-run. Same lesson as ConnectionError-vs-500 — be precise about which version of which thing you're observing.

**From M4.4 (Rate limiting — 2026-04-30):**
- **Defense in depth** — never trust one layer; stack Cloudflare/CDN → WAF → rate limit → CAPTCHA → app validation. Each catches what the previous missed. DSA: filter-pipeline / sieve-of-Eratosthenes — combined false-negative rate is the product of layer rates.
- **CDN (Cloudflare etc.)** — global edge servers between user and origin. Hides origin IP, drops bot traffic via reputation databases, absorbs DDoS, caches static assets. DSA: two-level cache hierarchy with reverse-proxy semantics, hit rate `h` → average latency `h*fast + (1-h)*slow`.
- **WAF (Web Application Firewall)** — inspects HTTP request *content* for known attack signatures (SQL injection, XSS, path traversal, command injection). DSA: multi-pattern regex matching via Aho-Corasick automaton; OWASP Core Rule Set is the canonical free rule library.
- **Rate-limiting algorithms** — three classics: **fixed window** (counter + timestamp, simple but boundary-burst-vulnerable), **sliding window** (deque of timestamps, more accurate), **token bucket** (floating-point tokens regenerating at a rate, allows bursts but caps sustained rate; used by AWS, GitHub, Stripe).
- **Rate limit keying** — what string identifies "who" the request belongs to. Per-IP (`get_remote_address`) for unauthenticated. Per-user-id for authenticated. Per-API-key for B2B. Composite (`ip + endpoint`) when separating buckets per route.
- **Storage backends for rate limiters** — `memory://` is a per-process Python dict (dies on restart, broken across multiple gunicorn workers). `redis://` is the production answer (shared, persistent, multi-process-safe). One reason Redis is in every real architecture diagram.
- **HTTP 429** — "Too Many Requests" status code (RFC 6585). Universal client convention for rate-limit hits. Always use standard codes; never invent your own.
- **`Retry-After` header** — RFC 7231 best practice on 429/503 responses. Tells client how many seconds to wait. Polite clients (browsers, well-written CLI tools, GitHub/Twitter SDKs) read it and back off automatically. DSA: a back-pressure signal — same pattern as TCP flow control.
- **Log severity levels (INFO / WARNING / ERROR)** — INFO for routine, WARNING for unusual-but-not-broken (rate_limit.exceeded), ERROR for genuine breaks (unhandled.exception). Picking the right level matters because it drives alerting thresholds. DSA: priority queue / bit-mask filtering on a severity enum.
- **Decorator stacking order** — Python applies decorators bottom-up. `@app.route` outermost (closer to function name) + `@limiter.limit` inner (right above `def`). Reading: `route(limiter(handler))`. DSA: function composition — `f(g(x))` order changes meaning.
- **Flask lifecycle determinism** — before_request → route → (errorhandler if needed) → after_request runs in fixed order regardless of which path is taken. Even rate-limit-rejected requests fire after_request. DSA: deterministic state machine with fixed-shape transitions.
- **Cheap rejection principle** — rate-limited request: 2.23ms. Real /lead: 2552ms. Edge defense is cheap; real work is expensive. The whole point of every defense layer is to reject 99% of bad traffic before it gets to expensive work — preserving expensive resources (API quota, network, CPU) for legitimate users.
- **Root logger compounding** — configuring the root logger once (M4.2) means every library that uses stdlib `logging` also emits JSON automatically (flask-limiter's own messages now JSON-formatted, no extra code). DSA: like setting up a base class — descendants inherit by default.
- **`pip freeze > requirements.txt`** — serialization. `pip freeze` walks the venv's installed-package set and prints `name==version` strings. `pip install -r` deserializes back. Same pattern as `json.dumps` / `json.loads`.
- **Network stack debugging (binary search down the layers)** — when something on the internet doesn't work, walk the stack top-to-bottom: app → HTTPS/TLS → TCP → DNS → IP → physical. Test each layer until you find the broken one. `getaddrinfo failed` = DNS layer. Browser works but pip doesn't = pip-specific or DNS-cache stale, not whole-network. DSA: binary search through a layered black-box system.
- **DNS resolution** — hostname → IP via `getaddrinfo`. DSA: HashMap lookup with TTL-based caching. Real world: phone book. `nslookup` = direct probe of the DNS table; `ipconfig /flushdns` = clear local cache.

**From M4.5 (Pydantic input validation — 2026-04-30):**
- **Validate-at-the-boundary (parse, don't validate)** — perform validation ONCE at the boundary where untrusted data enters; downstream code receives a typed object and doesn't recheck. Famous principle from typed-functional programming. Eliminates scattered defensive `if not name: ...` everywhere. DSA: same as Rust's `parse :: dict -> Result[T, Error]`. Real world: airport security at the lobby, not at every counter.
- **Pydantic v2 BaseModel** — declare a class inheriting from `BaseModel` with typed fields; Pydantic generates a runtime validator + serializer. v2 syntax is different from v1 (uses `model_config = ConfigDict(...)`, `@field_validator`, `model.model_dump()`). Most online tutorials still show v1 syntax — be alert.
- **`Literal[...]` types** — type that only allows specific listed values. `Literal["call", "whatsapp"]` = "either 'call' or 'whatsapp'." DSA: sum type / enum. Real world: multiple-choice question with only listed options.
- **`Field(..., min_length, max_length, ...)`** — attach validation predicates to a typed field. `...` (Ellipsis) means "required, no default." DSA: predicate-checked field; type check chains with length check.
- **`model_config = ConfigDict(extra="forbid")`** — strict whitelist; reject any field not declared in the schema. Default is `extra="ignore"` (silently drops unknown fields, can mask attacks). DSA: whitelist > blacklist; only accept declared keys.
- **`ValidationError.errors()`** — Pydantic's structured error: returns a list of dicts with `loc` (which field), `msg` (what's wrong), `type` (error category), `input` (the bad value). Allows multi-error responses (all problems reported at once, not just the first). DSA: multi-error result; comparable to a compiler reporting 10 errors at once.
- **Field-level error responses** — return `details: [{field, issue}, ...]` so the frontend can highlight specific inputs. Strictly better than "validation failed" with no detail.
- **Schema as single source of truth** — `Literal` types in the schema auto-document valid options in error messages ("Input should be 'X' or 'Y' or 'Z'"). No separate hand-written list of valid hostels — derive everything from one declaration. DSA: type-level enumeration projects automatically into runtime error text.
- **Naming conventions in Python (memorized via case-sensitivity bugs)** — modules: lowercase (`pydantic`, `flask`, `flask_limiter`); classes: PascalCase (`BaseModel`, `ConfigDict`, `Limiter`); functions/methods/vars: snake_case (`get_remote_address`); constants: UPPER_SNAKE (`VALID_HOSTELS`); private: leading underscore (`_get_client`). Python is case-sensitive — `Pydantic ≠ pydantic`, `configDict ≠ ConfigDict`.
- **Errorhandler precedence** — Flask uses MRO (Method Resolution Order) to pick the most-specific exception handler. `@app.errorhandler(ValidationError)` wins over `@app.errorhandler(Exception)` because it's a more specific subclass. DSA: walking up the inheritance tree to find the closest match. Real world: hospital triage — specialist over generalist.
- **Composable defense layers** — error handler (M4.1) + structured logger (M4.2) + request middleware (M4.3) + rate limiter (M4.4) + Pydantic validator (M4.5) all snap together cleanly. Each one has a single job, runs in defined order, returns to consistent JSON shape with consistent log format. Adding a new layer doesn't require touching existing layers. The shape of good architecture.

**From M4.6 (JWT auth + admin endpoint — 2026-05-02):**
- **Authentication vs Authorization (authn vs authz)** — different concerns. Authn answers "who are you?" (login). Authz answers "what are you allowed to do?" (role check). Real world: hotel front desk checks ID (authn); your keycard opens only your room (authz). DSA: authn = `creds → User`, authz = `(user, action) → bool`. Two separate functions; usually two separate layers.
- **JWT (JSON Web Token)** — self-contained signed string `header.payload.signature` (each base64-encoded, dot-separated). Server signs with secret + HMAC; client sends back on every request; server verifies signature locally without DB lookup. DSA: signed-string format; verification = recompute HMAC and compare. Real world: a movie ticket with a foil seal — staff can verify without phoning the box office.
- **HMAC (keyed hash)** — same secret signs and verifies. Anyone with the secret can sign; anyone seeing the result can verify. Different from a plain hash (anyone can compute MD5/SHA without a key, so it proves nothing about identity). DSA: keyed hash function; cryptographically secure (SHA256-based).
- **Stateless vs stateful auth** — JWT (stateless: server verifies locally, no DB lookup) scales horizontally; sessions (stateful: server stores `{session_id → user}` in DB) require shared session storage. JWT tradeoff: revocation is harder — token stays valid until exp. Mitigation: short expiry (15 min) + refresh tokens. DSA: stateless = pure function; stateful = function with side effects on shared state.
- **Bearer token convention** — `Authorization: Bearer <token>` HTTP header. "Bearer" means whoever holds it is treated as legitimate owner — leak the token = full impersonation. Always use HTTPS to keep it from being intercepted. DSA: standard string format universally understood by HTTP clients.
- **Token expiry / standard JWT claims** — RFC 7519 reserves: `sub` (subject = user ID), `iat` (issued at), `exp` (expiration). PyJWT auto-validates `exp` on decode. Real world: `sub` = name on ticket, `exp` = show date, `iat` = print time.
- **`functools.wraps`** — preserves the wrapped function's name, docstring, and metadata when writing custom decorators. Without it, every decorated route ends up named "wrapper" and Flask refuses duplicate route names. DSA: metadata preservation in higher-order functions. Real world: a visa stamp on your passport — adds layer without erasing your name.
- **Custom decorator pattern** — outer function takes the view, inner wrapper has the wrapping logic, return wrapper. The outer captures `view_func` via closure. Each `@require_auth` use creates a fresh closure remembering its specific route. DSA: closure over enclosing variable; fundamental higher-order-function pattern.
- **`secrets.compare_digest`** — constant-time string comparison. Naive `==` returns False on first mismatch, leaking info via response timing (timing attack — attacker measures response time to deduce password char-by-char). `compare_digest` always takes the same time regardless of where strings differ. DSA: side-channel resistant comparison. Real world: a bouncer who looks at every digit even after seeing the first wrong one.
- **`algorithms=[JWT_ALGO]` (always pass as allowlist)** — PyJWT requires you to specify which algorithms you accept. Prevents the "none algorithm" attack — old libraries used to allow `alg: "none"` (no signature), so attackers could hand-forge tokens with the alg field set to "none". Allowlist of expected algorithms blocks this. DSA: whitelist > blacklist (recurring pattern).
- **Brute-force defense via login rate limit** — login endpoints MUST be rate-limited. With 10/min limit, attacker has ~5,000 attempts/year; password search space of 10^10+ → centuries to brute-force. DSA: cuts attack rate by ~99.99%; transforms feasible attack into infeasible one.
- **Audit logging for privileged actions** — every successful admin action emits a structured event (`admin.leads.viewed` with user + count). Combined with timestamps, gives full "who did what when" trail. DSA: append-only audit log, same data structure as a database WAL or Git log.
- **Cheap rejection before expensive work** — auth check (~2ms) runs BEFORE the expensive sheet read (~5000ms). Same principle as rate limiting before /lead. The cheaper-defense-first ordering preserves expensive resources (Sheets quota, network) for legitimate users. DSA: short-circuit evaluation in a pipeline.
- **HTTP 401 vs 403** — 401 = "you haven't proven who you are" (no/bad credentials). 403 = "I know who you are but you can't do this." Use 401 in our case (token missing/invalid). Will use 403 when we add roles in Phase 6.
- **OAuth 2.0 token response shape** — `{access_token, token_type, expires_in}` in seconds. Every standard auth API returns this exact shape (GitHub, Google, Stripe, etc.) — universal convention.
- **HTTP 429 status code** (already from M4.4 but note the pattern) — same family of "the server has a polite reason to reject" codes as 401/403/429. Standard codes are an enum; clients understand them universally.
- **Definition order at module level (forward references don't exist)** — Python reads files top-to-bottom; module-level statements (decorators, constants, function defs) execute in order. Names referenced at module level must already be defined. Inside function bodies you can call functions defined later (because body isn't evaluated until call time). DSA: single-pass interpreter at module level; forward declarations exist in C/Java but not Python here.
- **Implicit return None bug** — a Python function that doesn't explicitly `return` returns None. Flask requires routes to return a valid response — None fails with `TypeError`. Caught by `@app.errorhandler(Exception)` → returns 500 to client. M4.2's `log.exception` puts the exact location in your JSON log stream — production observability paying off again.
- **Schema-on-read vs schema-on-write** — Sheets is schema-on-read (types inferred at read; phone stored as int because cell looked numeric). Postgres is schema-on-write (types enforced at insert; phone TEXT NOT NULL would catch this). Phase 3 will fix this whole class of issues by moving to a typed DB.

**🏆 PHASE 2 COMPLETE 2026-05-02** — 6 milestones over 6 days. Endpoint went from `print("got lead")` to fully hardened production API: auth + validation + rate limit + structured logs + error handlers + audit trail.

**From M5.1 (Postgres install — 2026-05-02):**
- **Postgres server vs database** — one Postgres server (one process on port 5432) hosts many databases. Each database is isolated from the others. We created `lalpur_hostels` as one tenant within the local server. DSA: a server is a HashMap of {db_name → schema}; databases share an engine but isolate data.
- **`postgres` superuser** — the default master account created at install time. Has all privileges. Don't use it for app traffic in production; create per-app accounts with limited privileges.
- **Windows PATH variable** — Windows' ordered list of directories searched when you type a command name. Adding `C:\Program Files\PostgreSQL\18\bin` makes `psql` callable from anywhere. New PowerShell windows pick up changes; existing windows cache the old PATH.
- **psql client** — command-line client for Postgres. `psql -U <user> -h <host>` connects. Inside, SQL statements end in `;` (without it, psql waits for more — prompt becomes `db-#`). Meta-commands start with `\` — `\l` lists DBs, `\q` quits, `\dt` lists tables, `\d <table>` describes a table.
- **SQL statement terminator** — `;` ends each SQL statement. Same as C/Java. Different from Python (newlines).
- **Helpful Postgres error UX** — auth errors echo back exactly the username/identifier that failed (`for user "postgress"`). Always read the quoted identifier — half the time it's a typo. Same lesson as DNS errors echoing the bad hostname.
- **Stack Builder** — separate EnterpriseDB tool for installing optional Postgres add-ons (replication tools, drivers, etc.). Not needed for our project. If it auto-launches at end of install, just cancel it.

---

## Code the user has written (and why)

- **`backend/app.py`** — First Flask app. Teaches: routes, decorators, JSON return, POST vs GET, validation, status codes, sets for allowlists, f-strings, dict `.get()` for safe key access, list comprehensions for filtering.
- **`backend/test_api.py`** — API test harness using `requests`. Teaches: `requests.get`/`post`, `json=` parameter, `response.status_code` / `response.json()`, running a second terminal to call a server without stopping it.
- **`backend/requirements.txt`** — Generated by `pip freeze`. Teaches: reproducibility — anyone can `pip install -r requirements.txt` to rebuild the exact venv.
- **Root `.gitignore`** — Added Python section (venv, __pycache__, credentials). Teaches: what to keep out of git and why.
- **`backend/sheets.py`** — Google Sheets integration module. Teaches: module separation, credentials loading, module-level caching, `gspread` API, column-to-list mapping on `append_row`.
- **`backend/.env`** — Environment config file (gitignored). Teaches: secrets vs code, `SHEET_ID` as config, industry standard for deploy platforms.
- **`backend/credentials.json`** — Google service account JSON key (gitignored). Teaches: what enterprise auth credentials look like, treating files as passwords.

---

## M1.5 playbook (for next session — for AI to follow, not for user to read now)

1. Ask user to create a Google Sheet at sheets.google.com called "Lalpur Hostels Leads" with 3 tabs named exactly:
   - `Muskan Girls Hostel`
   - `Sanskriti Girls Hostel`
   - `Sankalp Boys Hostel`
   Header row on each tab: `Timestamp | Name | Phone | Action | Actioned? | Remarks`.
2. Walk through Google Cloud Console: create project → enable **Google Sheets API** + **Google Drive API** → IAM → Service Accounts → Create → Keys → Add Key → JSON → download.
3. Save JSON as `backend/credentials.json` (already gitignored).
4. Share the Google Sheet with the service account's email (find it in the JSON file under `client_email`) — give Editor access.
5. `pip install gspread` → `pip freeze > requirements.txt`.
6. Modify `app.py`: add helper that opens sheet by name, selects tab by hostel, appends a row `[timestamp, name, phone, action, "No", ""]`. Replace the `print(...)` in `capture_lead()`.
7. Re-run `test_api.py` — valid lead should now appear as a row in the Muskan tab.
8. Open the sheet on phone/laptop, confirm row exists.
9. Mark M1.5 complete; move to M1.6 (end-to-end polish).
