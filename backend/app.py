from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

import sheets

load_dotenv()
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
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


VALID_HOSTELS = {
    "Muskan Girls Hostel",
    "Sanskriti Girls Hostel",
    "Sankalp Boys Hostel",
}
VALID_ACTIONS = {"call", "whatsapp"}


@app.route("/lead", methods=["POST"])
def capture_lead():
    data = request.get_json(silent=True)

    if data is None:
        return jsonify({"error": "Request body must be JSON"}), 400

    hostel = data.get("hostel")
    name = data.get("name")
    phone = data.get("phone")
    action = data.get("action")

    missing = [k for k in ("hostel", "name", "phone", "action") if not data.get(k)]
    if missing:
        return jsonify({"error": f"Missing fields:{','.join(missing)}"}), 400

    if hostel not in VALID_HOSTELS:
        return jsonify({"error": f"Unknown hostel: {hostel}"}), 400
    if action not in VALID_ACTIONS:
        return jsonify({"error": f"Invalid action: {action}"}), 400
    sheets.append_lead(hostel, name, phone, action)

    return jsonify({"status": "ok", "message": "Lead captured "}), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)
