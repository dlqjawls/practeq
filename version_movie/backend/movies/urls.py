from django.urls import path
from movies import views

urlpatterns = [
    # path("/", .as_view(), name="")
    path("<int:movie_id>/comment/", views.comment_get_post),
    path("<int:movie_id>/comment/<int:comment_pk>/", views.comment_put_delete),
    path("<str:movie_title>/", views.movie_search)
]

