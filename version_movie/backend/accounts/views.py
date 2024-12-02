from django.shortcuts import render
from django.contrib.auth import get_user_model
from movies.serializer import CommentCreateSerializer, CommentUpdateSerializer, CommentSerializer
from movies.models import Movie, Comment
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status


User = get_user_model()

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAccount(request):
    if request.method == 'DELETE':
        user = request.user
        user = get_object_or_404(User, username = user)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_404_NOT_FOUND)