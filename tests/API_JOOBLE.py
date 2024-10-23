import http.client
import json
from dotenv import load_dotenv
import os

load_dotenv()
JOOBLE_API_KEY = os.getenv('JOOBLE_API_KEY')

def generate_jobs_jooble(positionTitle):
    # Host y clave API
    host = 'jooble.org'
    key = JOOBLE_API_KEY

    # Crear una conexión HTTP
    connection = http.client.HTTPConnection(host)
    # Encabezados para la solicitud
    headers = {"Content-type": "application/json"}

    # Cuerpo de la consulta en formato JSON
    body = json.dumps({
        "keywords": positionTitle,
        "location": ""  # Puedes cambiar la ubicación si lo deseas
    })

    connection.request('POST', '/api/' + key, body, headers)
    response = connection.getresponse()
    print(response.status, response.reason)
    response_data = response.read()
    data = json.loads(response_data.decode('utf-8'))

    # Verificar si 'jobs' está en la respuesta
    if 'jobs' in data:
        # Limitar el número de trabajos a 3
        jobs = data['jobs'][:3]
        return jobs
        
        # Iterar sobre los trabajos limitados
        for i, job in enumerate(jobs):
            title = job.get('title', 'No Title')
            company = job.get('company', 'No Company')
            description = job.get('snippet', 'No Description')
            location = job.get('location', 'No Location')
            link = job.get('link', 'No Link')
            
            # print(f"{i+1}. Title: {title}")
            # print(f"   Company: {company}")
            # print(f"   Description: {description}")
            # print(f"   Location: {location}")
            # print(f"   Link: {link}\n")
    else:
        print("No jobs found or incorrect response format")



#snippet corresponde a la descripción.

#print(generate_jobs_jooble("Machine Learning Engineer"))