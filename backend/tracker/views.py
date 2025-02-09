from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer

from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
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
