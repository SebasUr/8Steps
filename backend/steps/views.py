from django.http import JsonResponse
from .utils.entirescriptfunc import generate_route


# Create your views here.

def get_route(request):
    userIn = "Machine Learning Engineer en google"
    route = generate_route(userIn)
    return JsonResponse(route, safe=False)
