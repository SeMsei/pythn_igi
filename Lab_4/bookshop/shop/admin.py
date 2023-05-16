from django.contrib import admin
from .models import Book, Author, Genre, Language

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
    list_display = ['title', 'image','get_author', 'summary', 'imprint', 'ISBN', 'genre', 'language', 'cost', 'status']

    def get_author(self, obj):
        return "\n".join([p.name for p in obj.author.all()])


    
