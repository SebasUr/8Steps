import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .utils.PROMPT_BACKEND import generate_route

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