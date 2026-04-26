import requests

BASE = "http://localhost:5000"

def show (label, response):
    print(f"\n--- {label} ---")
    print(f"status: {response.status_code}")
    try:
        print(f"Body: {response.json()}")
    except Exception:
        print(f"Body: {response.text}")

# Test 1: health check
show("Test 1: GET /", requests.get(f"{BASE}/"))

# Test 2: list hostels
show("Test 2: GET /hostels", requests.get(f"{BASE}/hostels"))

# Test 3: valid lead (should return 201)
show("Test 3: valid lead", requests.post(f"{BASE}/lead", json={
    "hostel": "Muskan Girls Hostel",
    "name": "Rahul Sharma",
    "phone": "9876543210",
    "action": "call",
}))

# Test 4: missing fields (should return 400)
show("Test 4: missing fields", requests.post(f"{BASE}/lead", json={
    "hostel": "Muskan Girls Hostel",
    "name": "Rahul",
}))

# Test 5: wrong hostel (should return 400)
show("Test 5: wrong hostel", requests.post(f"{BASE}/lead", json={
    "hostel": "FakeHostel",
    "name": "Rahul",
    "phone": "9876543210",
    "action": "call",
}))

# Test 6: invalid action (should return 400)
show("Test 6: invalid action", requests.post(f"{BASE}/lead", json={
    "hostel": "Sankalp Boys Hostel",
    "name": "Ayush",
    "phone": "9876543210",
    "action": "teleport",
}))

# Test 7: not JSON at all (should return 400)
show("Test 7: not JSON", requests.post(f"{BASE}/lead", data="plain text, not json"))

#Test 8: valid lead for Sanskriti( should return 201 ,row in sanskriti tab )
show("Test 8: Sanskriti Lead", requests.post(f"{BASE}/lead", json={
    "hostel": "Sanskriti Girls Hostel",
    "name": "Priya Kumari",
    "phone": "9876500001",
    "action": "whatsapp",
}))

#Test 9: valid lead for sankalp (should return 201, row in sankalp tab)
show("Test 9: Sankalp lead", requests.post(f"{BASE}/lead", json={
    "hostel": "Sankalp Boys Hostel",
    "name": "Amit Raj",
    "phone": "9876543210",
    "action": "call",
}))