import requests

# Datos de autenticación
CLIENT_ID = 'EEr58ok9yozgyDTzfc3iim9RccHmrmFaBo8mpVk2'
CLIENT_SECRET = 'HasHRje2P2ZnZFMK1z0gtSk7e6E4oUsP0lJR17He80BwmqQiz8XLAH06LtLOW4riuULEDZG5qKzy3ywVv3pkBYD90W7lPSTnv9OwMS7Cnxg0D0UcDw6zlYbk6UhgrEPy'

# URL base de la API de Udemy
UDEMY_API_URL = "https://www.udemy.com/api-2.0/courses/"

# Función para obtener la lista de cursos
def search_courses(query, page=1, page_size=1):
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
        cursos = response.json()
        for curso in cursos['results']:
            print(f"Curso: {curso['title']}")
            print(f"Descripción: {curso['headline']}\n")
            print(f"Link: https://www.udemy.com{curso['url']}\n")
        return cursos


    else:
        print(f"Error en la solicitud: {response.status_code}")
        return None

# # Ejemplo de uso
# cursos = obtener_cursos('Arduino for robotics')

# if cursos:
#     for curso in cursos['results']:
#         print(f"Curso: {curso['title']}")
#         print(f"Descripción: {curso['headline']}\n")
#         print(f"Link: https://www.udemy.com{curso['url']}\n")