import openai
from API_JOOBLE import generate_jobs_jooble
from API_UDEMY import search_courses
from API_ADZUNA import generate_jobs
from dotenv import load_dotenv
from openai import OpenAI
import os
import json
import re

load_dotenv()
client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("GPT_API_KEY"),
)

def extract_and_parse_json(input_string):
    match = re.search(r'```(.*?)```', input_string, re.DOTALL)
    if match:
        json_content = match.group(1).strip()
        try:
            json_data = json.loads(json_content)
            return json_data
        except json.JSONDecodeError:
            return "Unvalid JSON content"
    else:
        return "No ```"

def generate_route(userIn):
    search = userIn['search']
    occupation = userIn['occupation']
    prompt = f"Responde en español excepto en lo que hago aclaración. Ahora mismo me desempeño como '{occupation}' y quiero trabajar en o como '{search}'   , dame una trayectoria laboral de 8 pasos que me permita llegar hasta allí. Porfavor no menciones pasos que tengan que ver directamente con estudios, en los pasos que generes, de ser necesario puedes incluir estudios como requisitos. Los pasos mencionados, me los darás en formato JSON, el contenido del JSON irá encerrado en ``` ```. Cada paso tendrá como atributo: 'about_work', es de valor booleano, en caso de que el paso tenga que ver con un puesto laboral será verdadero, de lo contrario,falso. En caso de que sea verdadero, se generan los atributos 'title' y 'description',los cuales son el titulo y una descripción del en la que me hablarás del porqué de ese paso, para qué me servirá, darme consejos y recomendaciones, puedes alargarte allí para darme una mejor visión. 'description' tiene que ser de mínimo 256 caracteres.También 'position-title' que será un atributo que será el titulo del trabajo o posición EN INGLÉS que debería buscar en páginas web de trabajo.También 'duration' que es la duración aproximada del trabajo en 'dias-meses-años' y 'requirements',que es una lista con los requisitos técnicos o profesionalesrequeridos. De ser necesario, crea otro atributo 'abilities', en el cual van a ir las habilidades blandas que sean necesarias para el trabajo.También puedes crear el atributo 'courses' que tendrá el nombre de los cursos que podría buscar para aprender cosas necesariasen ese paso.En caso de que  'about_work' sea falso, solo genera 'title' y 'description', con la descripción anteriormente descrita. Tambiénsi quieres puedes añadir 'courses'. No generes texto adicional, SOLO EL JSON. En caso de que se pida algo diferente a un puesto laboral, solo responde 'introduce un puesto laboral válido' "

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": {prompt}}
        ]
    )

    promptResponse = response.choices[0].message.content
    print("The prompt has been created")
    print(promptResponse)
    json_result = extract_and_parse_json(promptResponse)
    
    for item in json_result:
        if 'position-title' in item:
            jobs_list = generate_jobs(item['position-title'])
            item['jobs_list'] = jobs_list

        if 'courses' in item:
            courses_list = search_courses(item['courses'])
            item['courses_list'] = courses_list
    print("Jobs and courses have been generated")

    def save_json_to_file(data, filename):
        try:
            with open(filename, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            print(f"Archivo {filename} guardado exitosamente.")
        except Exception as e:
            print(f"Ocurrió un error al guardar el archivo: {e}")

    save_json_to_file(json_result, 'results_data.json')

    return json_result

# Use example
print(generate_route({"occupation": "Estudiante de Ingeniería de Sistemas", "search": "Desarrollador de Software en google"}))
