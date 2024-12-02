from rest_framework import serializers
from movies.models import Movie, Comment

class MovieSerializer(serializers.ModelSerializer):
    class Meta :
        model = Movie
        fields = ('title','id')
        
class CommentSerializer(serializers.ModelSerializer):
    
    # ForeignKey 'user'의 'username' 필드를 가져옴
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ('content','updated_at', 'username', 'id')

class CommentCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = ('content',)
        
class CommentUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = ('content',)