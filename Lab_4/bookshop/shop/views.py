from django.shortcuts import render, get_object_or_404
from .models import Book, Genre, Language, Author, History, Article, Adversisment, \
                    Partner, Vacancy, FAQ, WorkerPosition, Comment, RotationTime
from coupons.models import Coupon
from login.models import CustomUser
from cart.forms import CartAddBookForm
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound
from django.core.exceptions import PermissionDenied
from datetime import datetime
from django.http import HttpResponse
from django.template import loader
from .forms import BookForm, CommentForm
import datetime
from datetime import date
import requests
import json

def book_list(request, book_genre_name = None):
    genre_ = None
    genres = Genre.objects.all()
    books = Book.objects.all()
    sort_t = request.GET.get('sort')
    
    is_auth = request.user.is_authenticated


    if (book_genre_name):
        genre_ = get_object_or_404(Genre, name = book_genre_name)
        books = books.filter(genre=genre_)

    if (str(sort_t) == 'ascending'):
        books = books.order_by('cost')
    elif (str(sort_t) == 'descending'):
        books = books.order_by('-cost')

    return render(request,
                  'shop/book/list.html',
                  {'genre': genre_, 'genres':genres, 'books':books, 'is_auth':is_auth})


def book_detail(request, id):
    book = get_object_or_404(Book, id=id)
    cart_book_form = CartAddBookForm()

    joke = requests.get('https://official-joke-api.appspot.com/jokes/programming/random').json()[0]
    #joke = ''

    return render(request, 
                  'shop/book/detail.html',
                  {'book':book, 'cart_book_form': cart_book_form, 'joke':joke['setup'] + joke['punchline']})

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
    
def privacy(request):
    from docx import Document

    doc = Document('../bookshop/media/privacy.docx')
    html_code = ""

    paragraphs = list()

    for paragraph in doc.paragraphs:
        paragraph_html = paragraph.text.split('\n')# replace('\n', '<br>')
        paragraph_html = list(filter(None, paragraph_html))
        #html_code += f"<p>{paragraph_html}</p>"
        paragraphs.append(paragraph_html)

    

    return render(request, "shop/Company/privacy.html", {"paragraphs": paragraphs})#{"privacy": html_code})
    
def about_company(request):
    hist = History.objects.all()
    out = list()
    out.append((hist[0].year, list()))
    out[0][1].append(hist[0].description)

    indx = 0

    for i in range(len(hist)):
        if (i == 0):
            continue

        if (hist[i].year == out[indx][0]):
            out[indx][1].append(hist[i].description)
        else:
            indx+=1
            out.append((hist[i].year, list()))
            out[indx][1].append(hist[i].description)

    out = sorted(out)

    return render(request, "shop/Company/About.html", {"history": out})

def main(request):
    if (request.method == "POST"):
        tmp = RotationTime.objects.get(id=1)
        tmp.time = request.POST.get('time')
        tmp.save()

    tmp = RotationTime.objects.get(id=1)

    return render(request, "shop/Company/main.html", {"last_article": list(Article.objects.all())[-1],
                                                      "adv": list(Adversisment.objects.all())[0],
                                                      "partners": list(Partner.objects.all()), 
                                                      "time": tmp.time})

def articles(request):
    return render(request, "shop/Company/articles.html", {"articles": list(Article.objects.all())})

def full_article(request, id):
    art = Article.objects.get(id=id)
    return render(request, "shop/Company/full_article.html", {"article": art})

def vacancies(request):
    vacancies = Vacancy.objects.all()
    return render(request, "shop/Company/vacancies.html", {"vacancies":vacancies})

def faqs(request):
    return render(request, "shop/Company/faqs.html", {"faqs":list(FAQ.objects.all())})

def faqs_full(request, id):
    faq = FAQ.objects.get(id=id)
    return render(request, "shop/Company/faq.html", {"faq":faq})

def workers_list(request):
    workers = WorkerPosition.objects.all()
    return render(request, "shop/Company/workers.html", {"workers": workers})

def coupons_list(request):
    print(list(Coupon.objects.filter(active=True)))
    active = json.dumps(list(Coupon.objects.filter(active=True)), default=lambda o: o.__dict__)
    inactive = json.dumps(list(Coupon.objects.filter(active=False)), default=lambda o: o.__dict__)
    return render(request, "shop/Company/coupons.html", {"active_coupons": Coupon.objects.filter(active=True), 
                                                        "disabled_coupons": Coupon.objects.filter(active=False),
                                                        "active_js":active, "inactive_js": inactive})
 
def comment_create(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("/auth/login/")

    form = CommentForm()

    if request.method == "POST":
        comment = Comment.objects.create(date=date.today().strftime('%Y-%m-%d'),
                                         author = CustomUser.objects.get(id=request.user.id),
                                         mark=request.POST.get('mark'),
                                         text=request.POST.get('text'))

        comment.save()
    else:
        return render(request, "shop/Comment/create.html", {"form" : form})
    return HttpResponseRedirect("/")

def comments_list(request):
    comments = Comment.objects.all()
    return render(request, "shop/Company/comments.html", {"comments": comments})

def sandbox(request):
    is_auth = request.user.is_authenticated
    return render(request, "shop/sandbox.html", {"is_auth":is_auth})

def ham(request):
    return render(request, 'shop/hamburger.html')