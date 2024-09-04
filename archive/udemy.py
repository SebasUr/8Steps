import requests

# Datos de autenticación
CLIENT_ID = ''
CLIENT_SECRET = ''

# URL base de la API de Udemy
UDEMY_API_URL = "https://www.udemy.com/api-2.0/courses/"

# Función para obtener la lista de cursos
def obtener_cursos(query, page=1, page_size=3):
    # Parámetros de la consulta
    params = {
        'search': query,
        'page': page,
        'page_size': page_size
    }

    # Realizar la solicitud GET a la API de Udemy
    response = requests.get(UDEMY_API_URL, params=params, auth=(CLIENT_ID, CLIENT_SECRET))

    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error en la solicitud: {response.status_code}")
        return None

# Ejemplo de uso
cursos = obtener_cursos('Arduino for robotics')

if cursos:
    for curso in cursos['results']:
        print(f"Curso: {curso['title']}")
        print(f"Descripción: {curso['headline']}\n")
        print(f"Link: https://www.udemy.com{curso['url']}\n")