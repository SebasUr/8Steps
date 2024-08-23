import requests

API_URL = "https://api.adzuna.com/v1/api/jobs/us/search/1"
APP_ID = "a60688b4"
API_KEY = "	"

response = requests.get(API_URL, params={
    "app_id": APP_ID,
    "app_key": API_KEY,
    "what": "Software Developer",  # campo de trabajo
    "where": "New York"  # ubicación opcional
})

jobs = response.json()

print(jobs)
