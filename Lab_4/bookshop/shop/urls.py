from django.urls import path
from . import views

app_name = 'shop'

urlpatterns = [
    path('<int:id>', views.book_detail,
         name='book_detail'),
    path("create/", views.book_create),
    path('about/', views.about_company),
    path('privacy/', views.privacy),
    path('main/', views.main),
    path('sandbox/', views.sandbox),
    path('ham/', views.ham),
    path('articles/', views.articles),
    path('articles/<int:id>/', views.full_article),
    path('vacancies/', views.vacancies),
    path('workers/', views.workers_list),
    path('coupons/', views.coupons_list),
    path('comments/', views.comments_list),
    path('comments/create/', views.comment_create),
    path('faq/', views.faqs),
    path('faq/<int:id>/', views.faqs_full),
    path("edit/<int:id>/", views.book_edit),
    path("delete/<int:id>/", views.book_delete),
    path('', views.book_list, name='book_list'),
    path('<str:book_genre_name>/', views.book_list,
         name='book_list_by_genre'
         ),
     
    
]