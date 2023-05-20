from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from shop.models import Book
from .cart import Cart
from .forms import CartAddBookForm
from django.core.exceptions import PermissionDenied

@require_POST
def cart_add(request, book_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("Net dostupa")

    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    form = CartAddBookForm(request.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(book=book,
                 quantity=cd['quantity'],
                 update_quantity=cd['update'])
    return redirect('cart:cart_detail')

def cart_remove(request, book_id):
    if not request.user.is_authenticated:
        raise PermissionDenied("Net dostupa")

    cart = Cart(request)
    book = get_object_or_404(Book, id=book_id)
    cart.remove(book)
    return redirect('cart:cart_detail')

def cart_detail(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("Net dostupa")
    cart = Cart(request)
    return render(request, 'cart/detail.html', {'cart': cart})