from django.contrib import admin
from django.urls import path, include
#from django.conf import settings
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'analyzer'

urlpatterns = [
    path('', views.main_show, name='main'),
    path('graph/', views.statistic_show, name='statistic'),
    path('tables/', views.table_1_show, name='table'),
    path('predict/<int:id>/', views.predict_show, name='predict'),
    path('stupid/', views.stupid_table, name='stupid')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
