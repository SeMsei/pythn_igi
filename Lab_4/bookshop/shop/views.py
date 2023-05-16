from django.shortcuts import render, get_object_or_404
from .models import Book, Genre, Language
from cart.forms import CartAddBookForm

def book_list(request, book_genre_name = None):
    genre = None
    genres = Genre.objects.all()
    books = Book.objects.all()

    if (book_genre_name):
        genre_ = get_object_or_404(Genre, name = book_genre_name)
        books = books.filter(genre=genre_)

    return render(request,
                  'shop/book/list.html',
                  {'genre': genre, 'genres':genres, 'books':books})


def book_detail(request, id):
    book = get_object_or_404(Book, id=id)
    cart_book_form = CartAddBookForm()

    print(book.id)

    return render(request, 
                  'shop/book/detail.html',
                  {'book':book, 'cart_book_form': cart_book_form})



