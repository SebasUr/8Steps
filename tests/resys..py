import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="Basado en los siguientes cursos, certificados me darás un json con 3 elementos que corresponderán a 3 rutas laborales que puedo seguir basado en esos cursos. El json tendrá las rutas directamente, es decir en formato [] Por ejemplo, si tengo un curso de Java y de Python, y una certificación de Software Engineer, me podrías recomendar una ruta como RouteName:\"Ingeniero de Software Senior en Google\" con una pequeña descripción de no más de 8 palabras. Cada elemento tendrá RouteName, y Description.",
)

chat_session = model.start_chat(
  history=[
  ]
)

response = chat_session.send_message("Cursos: habilidades blandas, project management desde 0, fundamentos en DevOps, Curso de administración de empresas. Certificados: Certificado en Scrum Master, Certificado en ITIL, Certificado en AWS Cloud Practitioner.")

print(response.parts[0].text)