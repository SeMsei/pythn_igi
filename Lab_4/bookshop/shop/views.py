from django.shortcuts import render, get_object_or_404
from .models import Book, Genre, Language, Author
from cart.forms import CartAddBookForm
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound
from django.core.exceptions import PermissionDenied
from datetime import datetime
from django.http import HttpResponse
from django.template import loader
from .forms import BookForm
import datetime
import requests
import json

def book_list(request, book_genre_name = None):
    genre = None
    genres = Genre.objects.all()
    books = Book.objects.all()
    sort_t = request.GET.get('sort')
    
    


    if (book_genre_name):
        genre_ = get_object_or_404(Genre, name = book_genre_name)
        books = books.filter(genre=genre_)

    if (str(sort_t) == 'ascending'):
        books = books.order_by('cost')
    elif (str(sort_t) == 'descending'):
        books = books.order_by('-cost')

    return render(request,
                  'shop/book/list.html',
                  {'genre': genre, 'genres':genres, 'books':books})


def book_detail(request, id):
    book = get_object_or_404(Book, id=id)
    cart_book_form = CartAddBookForm()

    joke = requests.get('https://official-joke-api.appspot.com/jokes/programming/random').json()[0]

    return render(request, 
                  'shop/book/detail.html',
                  {'book':book, 'cart_book_form': cart_book_form,
                   'joke': joke['setup'] + joke['punchline']})

def book_create(request):
    if not request.user.is_staff:
        raise PermissionDenied("Net dostupa")
    
    print(1234567)

    form = BookForm()

    if request.method == "POST":
        book = Book.objects.create(title=request.POST.get('title'),
                                         author = Author.objects.get(id=request.POST.get('author')),
                                         cost=request.POST.get('cost'),
                                         genre=Genre.objects.get(id=request.POST.get('genre')),
                                         quantity=0,
                                         ISBN=request.POST.get('ISBN'),
                                         imprint=request.POST.get('imprint'),
                                         summary=request.POST.get('summary'),
                                         image=request.POST.get('image'),
                                         language=Language.objects.get(id=request.POST.get('language')))

        book.save()
    else:
        return render(request, "shop/book/create.html", {"form" : form})
    return HttpResponseRedirect("/")
 
# изменение данных в бд
def book_edit(request, id):
    if not request.user.is_staff:
        raise PermissionDenied("Net dostupa")

    
    try:
        book = Book.objects.get(id=id)

        form = BookForm(initial={'title':book.title, 'author':book.author,
                                    'cost':book.cost, 'genre':book.genre, 
                                    'ISBN':book.ISBN, 'imprint':book.imprint,
                                    'summary':book.summary, 'image':book.image,
                                    'language':book.language})
 
        if request.method == "POST":
            book.title=request.POST.get('title')
            print(request.POST.get('title'))
            book.author=Author.objects.get(id=request.POST.get('author'))
            book.cost=request.POST.get('cost')
            book.genre=Genre.objects.get(id=request.POST.get('genre'))
            book.quantity=0
            book.ISBN=request.POST.get('ISBN')
            book.imprint=request.POST.get('imprint')
            book.summary=request.POST.get('summary')
            book.image=request.FILES.get('image')
            book.language=Language.objects.get(id=request.POST.get('language'))

            book.save()
            return HttpResponseRedirect("/")
        else:
            return render(request, "shop/book/edit.html", {"book": book, 'form':form})
    except book.DoesNotExist:
        return HttpResponseNotFound("<h2>book not found</h2>")
     
# удаление данных из бд
def book_delete(request, id):
    if not request.user.is_stuff:
        raise PermissionDenied("Net dostupa")

    try:
        book = Book.objects.get(id=id)
        book.delete()
        return HttpResponseRedirect("/")
    except book.DoesNotExist:
        return HttpResponseNotFound("<h2>book not found</h2>")
    

