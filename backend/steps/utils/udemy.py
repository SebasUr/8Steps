import requests

# Datos de autenticación
CLIENT_ID = 'EEr58ok9yozgyDTzfc3iim9RccHmrmFaBo8mpVk2'
CLIENT_SECRET = 'HasHRje2P2ZnZFMK1z0gtSk7e6E4oUsP0lJR17He80BwmqQiz8XLAH06LtLOW4riuULEDZG5qKzy3ywVv3pkBYD90W7lPSTnv9OwMS7Cnxg0D0UcDw6zlYbk6UhgrEPy'

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

# Lista de queries
# queries_list = ["Data visualization with Python", "Machine Learning", "Web Development"]

# # Llamada a la función
# result = search_courses(queries_list)

# # Mostrar los resultados en formato JSON
# print(result)

# # Ejemplo de uso
# cursos = obtener_cursos('Arduino for robotics')

# if cursos:
#     for curso in cursos['results']:
#         print(f"Curso: {curso['title']}")
#         print(f"Descripción: {curso['headline']}\n")
#         print(f"Link: https://www.udemy.com{curso['url']}\n")