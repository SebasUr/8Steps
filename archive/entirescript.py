from groq import Groq
from adzuna import generate_jobs
from jooble import generate_jobs_jooble
from udemy import search_courses
import requests
import json
import re

def extract_and_parse_json(input_string):
    match = re.search(r'```(.*?)```', input_string, re.DOTALL)
    if match:
        json_content = match.group(1).strip()  # Extraer y limpiar el contenido
        try:
            json_data = json.loads(json_content)  # Convertir a objeto JSON
            return json_data
        except json.JSONDecodeError:
            return "Unvalid JSON content"
    else:
        return "No ```"

# Prueba input
userIn = input("Menciona tu puesto deseado: ")
prompt = f"Responde en español excepto en lo que hago aclaración. Quiero trabajar en o como {userIn}, dame una trayectoria laboral de 8 pasos que me permita llegar hasta allí. Porfavor no menciones pasos que tenganque ver directamente con estudios, en los pasos que generes, de ser necesario puedes incluir estudios como requisitos. Los pasos mencionados, me los darás en formatoJSON. Cada paso tendrá como atributo: 'about_work', es de valor booleano, en caso de que el paso tenga que ver con un puesto laboral será verdadero, de lo contrario,falso. En caso de que sea verdadero, se generan los atributos 'title' y 'description',los cuales son el titulo y una descripción del en la que me hablarás del porqué de ese paso, para qué me servirá, darme consejos y recomendaciones, puedes alargarte allí para darme una mejor visión. 'description' tiene que ser de mínimo 256 caracteres.También 'position-title' que será un atributo que será el titulo del trabajo o posición EN INGLÉS que debería buscar en páginas web de trabajo.También 'duration' que es la duración aproximada del trabajo en 'dias-meses-años' y 'requirements',que es una lista con los requisitos técnicos o profesionalesrequeridos. De ser necesario, crea otro atributo 'abilities', en el cual van a ir las habilidades blandas que sean necesarias para el trabajo.También puedes crear el atributo 'courses' que tendrá el nombre de los cursos que podría buscar para aprender cosas necesariasen ese paso.En caso de que  'about_work' sea falso, solo genera 'title' y 'description', con la descripción anteriormente descrita. Tambiénsi quieres puedes añadir 'courses'. No generes texto adicional, SOLO EL JSON. En caso de que se pida algo diferente a un puesto laboral, solo responde 'introduce un puesto laboral válido' "
client = Groq(
    api_key="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"
)

# Prompt to llama 
completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    # As the temperature approaches zero, the model will become deterministic and repetitive.
    temperature=1,
    max_tokens=4096,

    #An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
    top_p=1,
    stream=False,
    stop=None,
)

# If stream is true
#for chunk in completion:
#    print(chunk.choices[0].delta.content or "", end="")

# If stream is false
promptResponse = completion.choices[0].message.content
print(type(promptResponse))
json_result = extract_and_parse_json(promptResponse)
print(json_result)

# Print jobs 

for item in json_result:
    if 'position-title' in item:
        # generate_jobs(item['position-title'])
        generate_jobs_jooble(item['position-title'])

    if 'courses' in item:
        for courses in item['courses']:
            print(f"Buscando {courses}")
            search_courses(courses)

