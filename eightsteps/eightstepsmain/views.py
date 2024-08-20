from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    # return HttpResponse("<h1>Welcome to homepage </h1>")
    return render(request, "mainpage.html")

def route(request):
# return HttpResponse("<h1>Welcome to homepage </h1>")
    return render(request, "stepspage.html")
