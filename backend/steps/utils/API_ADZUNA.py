import requests
from dotenv import load_dotenv
import os

load_dotenv()
ADZUNA_API_KEY = os.getenv('ADZUNA_API_KEY')

API_URL = "https://api.adzuna.com/v1/api/jobs/us/search/1"
APP_ID = "a60688b4"
API_KEY = ADZUNA_API_KEY

def generate_jobs(positionTitle):

    response = requests.get(API_URL, params={
        "app_id": APP_ID,
        "app_key": API_KEY,
        "what": positionTitle,
        "results_per_page": 2,  # Limita el número de resultados a 3
        "content-type": "application/json"
    })

    jobs = response.json()
    return jobs.get('results', [])

    if 'results' in jobs:
        for idx, job in enumerate(jobs['results'], 1):
            title = job.get('title', 'N/A')
            salary_min = job.get('salary_min', 'N/A')
            company = job.get('company', {}).get('display_name', 'N/A')
            description = job.get('description', 'N/A')
            location = job.get('location', {}).get('display_name', 'N/A')
            
            print(f"Job {idx}:")
            print(f"  Title: {title}")
            print(f"  Salary Min: {salary_min}")
            print(f"  Company: {company}")
            print(f"  Description: {description}")
            print(f"  Location: {location}")
            print()
    else:
        print("No jobs found or error in the response.")