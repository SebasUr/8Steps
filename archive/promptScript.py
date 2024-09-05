from groq import Groq

userin = input("Menciona tu puesto deseado: ")
prompt = f"Responde en español. Quiero trabajar en o como {userin}, dame una trayectoria laboral de 8 pasos que me permita llegar hasta allí. Porfavor no menciones pasos que tenganque ver directamente con estudios, en los pasos que generes, de ser necesario puedes incluir estudios como requisitos. Los pasos mencionados, me los darás en formatoJSON. Cada paso tendrá como atributo: 'about_work', es de valor booleano, en caso de que el paso tenga que ver con un puesto laboral será verdadero, de lo contrario,falso. En caso de que sea verdadero, se generan los atributos 'title' y 'description',los cuales son el titulo y una descripción del en la que me hablarás del porqué de ese paso, para qué me servirá, darme consejos y recomendaciones, puedes alargarte allí para darme una mejor visión. 'description' tiene que ser de mínimo 256 caracteres.También 'position-title' que será un atributo que será el titulo del trabajo o posición que debería buscar en páginas web de trabajo.También 'duration' que es la duración aproximada del trabajo en 'dias-meses-años' y 'requirements',que es una lista con los requisitos técnicos o profesionalesrequeridos. De ser necesario, crea otro atributo 'abilities', en el cual van a ir las habilidades blandas que sean necesarias para el trabajo.También puedes crear el atributo 'courses' que tendrá el nombre de los cursos que podría buscar para aprender cosas necesariasen ese paso.En caso de que  'about_work' sea falso, solo genera 'title' y 'description', con la descripción anteriormente descrita. Tambiénsi quieres puedes añadir 'courses'. No generes texto adicional, SOLO EL JSON."
client = Groq(
    api_key=""
)

completion = client.chat.completions.create(
    model="llama3-70b-8192",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    # As the temperature approaches zero, the model will become deterministic
    # and repetitive.
    temperature=1,
    max_tokens=4096,
    top_p=1,
    stream=False,
    stop=None,
)


# If stream is true
#for chunk in completion:
#    print(chunk.choices[0].delta.content or "", end="")

# If stream is false
hi = completion.choices[0].message.content
print(type(hi))


import json
import re
import os

def extract_and_parse_json(input_string, filename='output.json'):
    # Usar una expresión regular para extraer el contenido entre ```.
    match = re.search(r'```(.*?)```', input_string, re.DOTALL)
    
    if match:
        json_content = match.group(1).strip()  # Extraer y limpiar el contenido
        try:
            json_data = json.loads(json_content)  # Convertir a objeto JSON
            print(json_data)  # Imprimir el JSON

            # Guardar el JSON en un archivo
            script_dir = os.path.dirname(os.path.realpath(__file__))  # Directorio del script
            file_path = os.path.join(script_dir, filename)  # Crear la ruta completa
            with open(file_path, 'w') as json_file:
                json.dump(json_data, json_file, indent=4)

            print(f"JSON guardado en {file_path}")
            return json_data
        except json.JSONDecodeError:
            return "Error: El contenido no es un JSON válido"
    else:
        return "Error: No se encontró contenido entre ```"

# Ejemplo de uso
json_result = extract_and_parse_json(hi, 'resultado.json')
