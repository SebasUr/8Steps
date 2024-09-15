from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")), # This is from the Django Rest Framework
    path("api/auth/", include("users_api.urls")), # For the moment, this is the main page. The route should be "api/auth/"
    path('', include('steps.urls'))
]
