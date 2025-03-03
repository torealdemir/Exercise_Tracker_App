from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, ExerciseLogSerializer


from .models import ExerciseLog
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from rest_framework import viewsets, permissions

@api_view(['POST'])
@permission_classes([AllowAny]) # Allow anyone to register
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user) # create jwt token
        return Response({
            "user":serializer.data,
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExerciseLogViewSet(viewsets.ModelViewSet):
    """
    A viewset that allows users to create, update, retrieve, and delete their own exercise logs.
    """
    serializer_class = ExerciseLogSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can access

    def get_queryset(self):
        """Returns only the logged-in user's exercise logs."""
        return ExerciseLog.objects.filter(user=self.request.user).order_by("-date")

    def perform_create(self, serializer):
        """Ensures that the new exercise log is linked to the authenticated user."""
        serializer.save(user=self.request.user)
