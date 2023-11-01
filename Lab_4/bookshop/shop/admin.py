from django.contrib import admin
from .models import Book, Author, Genre, Language, Client, History, \
                    Article, Adversisment, Partner, Vacancy, FAQ, WorkerPosition, \
                    Comment, RotationTime

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
    
@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ['year', 'description']

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['date', 'title', 'short', 'full', 'author_art', 'img']

@admin.register(Adversisment)
class AdversismentAdmin(admin.ModelAdmin):
    list_display = ['text', 'img', 'link', 'company_name']

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'img', 'link']

@admin.register(Vacancy)
class VacancyAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'salary']

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ['question', 'date', 'answer']

@admin.register(WorkerPosition)
class WorkerPositionAdmin(admin.ModelAdmin):
    list_display = ['worker', 'description', 'img']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['date', 'mark', 'author', 'text']
    
@admin.register(RotationTime)
class RotationTimeAdmin(admin.ModelAdmin):
    list_display = ['time']