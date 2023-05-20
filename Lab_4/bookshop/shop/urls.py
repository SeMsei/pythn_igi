from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('<int:id>', views.book_detail,
         name='book_detail'),
    path("create/", views.book_create),
    path("edit/<int:id>/", views.book_edit),
    path("delete/<int:id>/", views.book_delete),
    path('', views.book_list, name='book_list'),
    path('<str:book_genre_name>/', views.book_list,
         name='book_list_by_genre'
         ),
    
]