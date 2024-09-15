from django.urls import path
from . import views

urlpatterns = [
    path('steps/', views.get_route , name='get_route'),
]
