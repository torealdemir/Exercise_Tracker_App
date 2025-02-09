from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user

urlpatterns = [
    path('register/', register_user, name="register"), #user registration
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #login
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh') #refresh_token
]