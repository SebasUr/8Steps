from django.shortcuts import render

# This is temporary, we will replace this in the future
def home(request):
    return render(request, "mainpage.html")

def route(request):
    return render(request, "stepspage.html")