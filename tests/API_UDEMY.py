import requests
from dotenv import load_dotenv
import os

load_dotenv()
UDEMY_API_KEY = os.getenv('UDEMY_API_KEY')
# Datos de autenticación
CLIENT_ID = 'EEr58ok9yozgyDTzfc3iim9RccHmrmFaBo8mpVk2'
CLIENT_SECRET = UDEMY_API_KEY

# URL base de la API de Udemy
UDEMY_API_URL = "https://www.udemy.com/api-2.0/courses/"

# Función para obtener la lista de cursos
def search_courses(queries, page=1, page_size=1):
    all_courses = [] 

    for query in queries:
        params = {
            'search': query,
            'page': page,
            'page_size': page_size
        }

        response = requests.get(UDEMY_API_URL, params=params, auth=(CLIENT_ID, CLIENT_SECRET))

        if response.status_code == 200:
            cursos = response.json()
            for curso in cursos['results']:
                course_data = {
                    'title': curso['title'],
                    'description': curso['headline'],
                    'link': f"https://www.udemy.com{curso['url']}"
                }
                all_courses.append(course_data)  # Agregar el curso a la lista

        else:
            print(f"Error en la solicitud para query '{query}': {response.status_code}")

    return all_courses  # Retornar la lista de todos los cursos en formato JSON