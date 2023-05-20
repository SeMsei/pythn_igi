from django.contrib import admin
from .models import Book, Author, Genre, Language, Client

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'date_of_birth', 'date_of_death']

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'image','author', 'summary', 'imprint', 'ISBN', 'genre', 'language', 'cost', 'status','purchase_count']
    list_filter = ['genre', 'author', 'language']
    #№def get_author(self, obj):
        #return "\n".join([p.name for p in obj.author.all()])
    
@admin.register(Client)
class ClientAdmin(admin.ModelAdmin) :
    list_display = ['first_name', 'last_name', 'date_of_birth',
                    'email', 'phone_number']


    
