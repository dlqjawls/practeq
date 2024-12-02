from django.shortcuts import render
from django.contrib.auth import get_user_model
from movies.serializer import CommentCreateSerializer, CommentUpdateSerializer, CommentSerializer, MovieSerializer
from movies.models import Movie, Comment
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework import status

# 영화 상세페이지별 모든 댓글 GET
# 영화 상세페이지별 댓글 POST
# 영화 상세페이지별 특정 댓글 UPDATE
# 영화 상세페이지별 특정 댓글 DELETE

@api_view(['GET','POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def comment_get_post(request, movie_id): # 해당 영화 상세페이지의 모든 댓글을 불러오는 / 생성하는 함수, 
    if request.method == 'GET':
        movie = get_object_or_404(Movie, id = movie_id)                                     # id = movie_id
        comments = movie.comments.all().order_by('-updated_at')  # 최신순 정렬
        serializer = CommentSerializer(comments, many=True)
        return Response(data=serializer.data , status=status.HTTP_200_OK) # 응답값
    elif request.method == 'POST':
        serializer = CommentCreateSerializer(data=request.data) # serialize
        if serializer.is_valid(): # validation
            movie = get_object_or_404(Movie, id = movie_id ) # movie 특정                   # id = movie_id
            user = request.user # user 특정
            comment = serializer.save(movie = movie , user = user) # 댓글 저장
            serializer = CommentSerializer(comment)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED) # 응답값
    return Response(status= status.HTTP_404_NOT_FOUND) # 에러시 응답값
       
@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def comment_put_delete(request, movie_id, comment_pk):
    if request.method =='PUT':
        comment = get_object_or_404(Comment, pk=comment_pk) # 해당 comment 불러오기
        serializer = CommentUpdateSerializer(instance = comment, data = request.data) #기존 comment 의 instance에 새로운 데이터 저장
        if serializer.is_valid(): # validation
            comment = serializer.save() # 댓글 저장후 comment 객체 반환
            serializer = CommentSerializer(comment) # comment 객체 직렬화
            return Response(data = serializer.data, status = status.HTTP_200_OK)
    elif request.method == 'DELETE':
        comment = get_object_or_404(Comment, pk=comment_pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status= status.HTTP_404_NOT_FOUND) # 에러시 응답값

@api_view(['GET'])
@permission_classes([AllowAny])
def movie_search(request, movie_title):
    movies = Movie.objects.filter(title__icontains=movie_title)
    if movies : 
        serializer = MovieSerializer(movies, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    return Response(data={}, status=status.HTTP_404_NOT_FOUND)

