import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils.PROMPT_BACKEND import generate_route
from django.conf import settings
from users.models import CustomUser

@csrf_exempt
def get_route(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            occupation = data.get("occupation", "")
            seach = data.get("search", "Machine Learning Engineer en google")
            
            user_input = {
                "occupation": occupation,
                "search": seach
            }
            return JsonResponse(generate_route(user_input), safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request"}, status=405)

@csrf_exempt
def get_recommendations(request):
    import os 
    import google.generativeai as genai
    from dotenv import load_dotenv
    load_dotenv()
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    genai.configure(api_key=GEMINI_API_KEY)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = CustomUser.objects.get(username=data.get("username"))

            if not user.courses or not user.certifications:
                return JsonResponse({"error": "User must have courses and certifications"}, status=400)

            courses = str(user.courses)
            certifications = str(user.certifications)

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
                system_instruction="Basado en los siguientes cursos, certificados me darás un json con 3 elementos que corresponderán a 3 rutas laborales que puedo seguir basado en esos cursos y certificados. El json tendrá las rutas directamente, es decir en formato [] Por ejemplo, si tengo un curso de Java y de Python, y una certificación de Software Engineer, me podrías recomendar una ruta laboral que pueda llegar a seguir y que sea en un futuro, puede especificar una empresa grande del sector, un ejemplo sería RouteName:\"Ingeniero de Software Senior en Google\" con una pequeña descripción de no más de 8 palabras. Cada elemento tendrá RouteName, y Description.",
            )

            chat_session = model.start_chat(history=[])
            prompt = f"{courses} {certifications}"
            if prompt=="{'courses': []} {'certifications': []}":
                return JsonResponse({"error": "User must have courses and certifications"}, status=400)
            response = chat_session.send_message(prompt)

            recommendations = response.parts[0].text
            # print(f"prompt: {prompt}")
            # print(recommendations)

            return JsonResponse({"recommendations": json.loads(recommendations)}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=405)