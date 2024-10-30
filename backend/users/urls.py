from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("api/user/register/", views.CreateUserView.as_view(), name="register"),
    path("api/user/profile/", views.UserProfileView.as_view(), name="profile"),
]