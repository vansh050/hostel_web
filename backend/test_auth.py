import requests

BASE = "http://localhost:5000"
USERNAME = "Vansh"  # must match ADMIN_USERNAME in .env
PASSWORD = "Vansh@123"  # must match ADMIN_PASSWORD in .env

print("\n--- 1. Login with WRONG password ---")
r = requests.post(f"{BASE}/login", json={"username": USERNAME, "password": "wrong"})
print(f"status: {r.status_code}")
print(f"body: {r.json()}")

print("\n--- 2. Login with CORRECT credentials ---")
r = requests.post(f"{BASE}/login", json={"username": USERNAME, "password": PASSWORD})
print(f"status: {r.status_code}")
data = r.json()
token = data.get("access_token", "")
print(f"got token: {token[:30]}... (truncated for safety)")
print(f"expires_in: {data.get('expires_in')} seconds")

print("\n--- 3. GET /admin/leads with NO token ---")
r = requests.get(f"{BASE}/admin/leads")
print(f"status: {r.status_code}")
print(f"body: {r.json()}")

print("\n--- 4. GET /admin/leads with INVALID token ---")
r = requests.get(f"{BASE}/admin/leads", headers={"Authorization": "Bearer not-a-real-token"})
print(f"status: {r.status_code}")
print(f"body: {r.json()}")

print("\n--- 5. GET /admin/leads with VALID token ---")
r = requests.get(f"{BASE}/admin/leads", headers={"Authorization": f"Bearer {token}"})
print(f"status: {r.status_code}")
data = r.json()
print(f"count: {data.get('count')}")
leads = data.get("leads", [])
if leads:
    print(f"first lead: {leads[0]}")
