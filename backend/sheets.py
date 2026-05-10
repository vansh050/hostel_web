import json
import os
from datetime import datetime

import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

DEFAULT_ACTIONED_STATUS = "NotActioned"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CREDS_PATH = os.path.join(BASE_DIR, "credentials.json")

_client = None


def _load_credentials():
    creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
    if creds_json:
        info = json.loads(creds_json)
        return Credentials.from_service_account_info(info, scopes=SCOPES)
    return Credentials.from_service_account_file(CREDS_PATH, scopes=SCOPES)


def _get_client():
    global _client
    if _client is None:
        creds = _load_credentials()
        _client = gspread.authorize(creds)
    return _client


def append_lead(hostel: str, name: str, phone: str, action: str) -> None:
    client = _get_client()
    sheet = client.open_by_key(os.environ["SHEET_ID"])
    worksheet = sheet.worksheet(hostel)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    worksheet.append_row([timestamp, name, phone, action, DEFAULT_ACTIONED_STATUS, ""])


def read_all_leads():
    """Read every row from every hostel tab and return a flat list."""
    client = _get_client()
    sheet_id = os.environ["SHEET_ID"]
    spreadsheet = client.open_by_key(sheet_id)
    leads = []
    for tab_name in ("Muskan Girls Hostel", "Sanskriti Girls Hostel", "Sankalp Boys Hostel"):
        worksheet = spreadsheet.worksheet(tab_name)
        rows = worksheet.get_all_records()
        for row in rows:
            row["hostel"] = tab_name
            leads.append(row)


    return leads
