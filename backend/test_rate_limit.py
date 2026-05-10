import requests
URL ="http://localhost:5000/lead"

for i in range(1,8):
    r=requests.post(URL,json={})
    print(f"Request {i}: status={r.status_code} body={r.json()}")
