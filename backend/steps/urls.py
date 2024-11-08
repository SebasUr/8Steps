from django.urls import path
from . import views

urlpatterns = [
    path('steps/', views.get_route , name='get_route'),
    path('recommendations/', views.get_recommendations , name='get_recommendations'),
]
