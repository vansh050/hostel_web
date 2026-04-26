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


def _get_client():
    global _client
    if _client is None:
        creds = Credentials.from_service_account_file(CREDS_PATH, scopes=SCOPES)
        _client = gspread.authorize(creds)
    return _client


def append_lead(hostel: str, name: str, phone: str, action: str) -> None:
    client = _get_client()
    sheet = client.open_by_key(os.environ["SHEET_ID"])
    worksheet = sheet.worksheet(hostel)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    worksheet.append_row([timestamp, name, phone, action, DEFAULT_ACTIONED_STATUS, ""])

