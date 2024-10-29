from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv('GPT_API_KEY'),)


completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Responde en español excepto en lo que hago aclaración. Ahora mismo me desempeño como Estudiante de Ingeniería de Sistemas y quiero trabajar en o como Ingeniero de Software Senior en Google   , dame una trayectoria laboral de 8 pasos que me permita llegar hasta allí. Porfavor no menciones pasos que tengan que ver directamente con estudios, en los pasos que generes, de ser necesario puedes incluir estudios como requisitos. Los pasos mencionados, me los darás en formato JSON, el contenido del JSON irá encerrado en ``` ```. Cada paso tendrá como atributo: 'about_work', es de valor booleano, en caso de que el paso tenga que ver con un puesto laboral será verdadero, de lo contrario,falso. En caso de que sea verdadero, se generan los atributos 'title' y 'description',los cuales son el titulo y una descripción del en la que me hablarás del porqué de ese paso, para qué me servirá, darme consejos y recomendaciones, puedes alargarte allí para darme una mejor visión. 'description' tiene que ser de mínimo 256 caracteres.También 'position-title' que será un atributo que será el titulo del trabajo o posición EN INGLÉS que debería buscar en páginas web de trabajo.También 'duration' que es la duración aproximada del trabajo en 'dias-meses-años' y 'requirements',que es una lista con los requisitos técnicos o profesionalesrequeridos. De ser necesario, crea otro atributo 'abilities', en el cual van a ir las habilidades blandas que sean necesarias para el trabajo.También puedes crear el atributo 'courses' que tendrá el nombre de los cursos que podría buscar para aprender cosas necesariasen ese paso.En caso de que  'about_work' sea falso, solo genera 'title' y 'description', con la descripción anteriormente descrita. Tambiénsi quieres puedes añadir 'courses'. No generes texto adicional, SOLO EL JSON. En caso de que se pida algo diferente a un puesto laboral, solo responde 'introduce un puesto laboral válido' "}
    ]
)

print(completion.choices[0].message.content)