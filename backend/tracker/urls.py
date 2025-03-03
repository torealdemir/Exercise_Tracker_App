from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import register_user, ExerciseLogViewSet

from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(r'exercises', ExerciseLogViewSet, basename="exercise")

urlpatterns = [
    path('register/', register_user, name="register"), #user registration
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), #login
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'), #refresh_token
    path('exercises/', include(router.urls)),
]