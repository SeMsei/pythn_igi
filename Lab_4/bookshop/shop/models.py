from django.db import models
from typing import List
from datetime import date
from django.urls import reverse
from login.models import CustomUser
from django.core.validators import MinValueValidator, MaxValueValidator

class Author(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter author name') 
    date_of_birth = models.DateField()
    date_of_death = models.DateField()

    def get_absolute_url(self):
        return reverse('shop:author-detail', args=[str(self.id)])

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter genre name')
    
    def get_absolute_url(self):
        return reverse('shop:book_list_by_genre', args=[str(self.name)])

    def __str__(self):
        return self.name

class Language(models.Model):
    name = models.CharField(max_length=200,
                            help_text='Enter language name')
    
    def get_absolute_url(self):
        return reverse('shop:book_list_by_language', args=[str(self.name)])

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200,
                            help_text='Enter book title')
    author = models.ForeignKey(Author, on_delete = models.CASCADE)
    summary = models.CharField(max_length=200,
                            help_text='Enter book summry')
    imprint = models.CharField(max_length=200,
                            help_text='Enter imprint')
    image = models.ImageField(upload_to='book/%Y/%m/%d', blank=True)
    ISBN = models.CharField(max_length=200,
                            help_text='Enter ISBN')
    quantity = models.IntegerField()
    purchase_count = models.PositiveIntegerField(default=0)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    cost = models.IntegerField()
    LOAN_STATUS = (
        ('A', 'available'),
        ('U', 'unavailable')
    )
    status = models.CharField(max_length=1,
                            choices=LOAN_STATUS,
                            help_text="units of product")

    def get_absolute_url(self):
        return reverse('shop:book_detail', args=[str(self.id)])

    def __str__(self):
        return self.title

class Client(models.Model) :

    first_name = models.CharField(max_length=200,
                                help_text='Enter first name')
    last_name = models.CharField(max_length=200,
                                help_text='Enter last name')
    date_of_birth = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=50,
                                    help_text='Enter phone number')
    
    def get_absolute_url(self):
        return reverse('client-detail', args=[str(self.id)])

    def __str__(self) :
        return '{0}, {1}'.format(self.first_name, self.last_name) 
    
class History(models.Model):
    year = models.PositiveIntegerField(
            validators=[
                MinValueValidator(1900), 
                MaxValueValidator(date.today().year)],
                help_text="Use the following format: YYYY")
    description = models.TextField()

    def __str__(self):
        return self.description
    
class Article(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=200)
    short = models.TextField()
    full = models.TextField()
    author_art = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    img = models.ImageField()

class Adversisment(models.Model):
    company_name=models.CharField(max_length=200)
    text = models.CharField(max_length=200)
    img = models.ImageField()
    link = models.CharField(max_length = 200)

class Partner(models.Model):
    company_name=models.CharField(max_length=200)
    img = models.ImageField()
    link = models.CharField(max_length = 200)

class Vacancy(models.Model):
    name = models.CharField(max_length=200)
    salary = models.IntegerField()
    description = models.TextField()

class FAQ(models.Model):
    question = models.CharField(max_length=200)
    answer = models.TextField()
    date = models.DateField()

class WorkerPosition(models.Model):
    worker = models.OneToOneField(CustomUser, on_delete=models.CASCADE, 
                               limit_choices_to={'is_staff': True})
    img = models.ImageField()
    description = models.TextField()

INT_CHOICES = [(x, "★"*x) for x in range(1, 6)]

class Comment(models.Model):
    

    date = models.DateField()
    mark = models.IntegerField(choices=INT_CHOICES, validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    author = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    text = models.TextField()

'''
class BookInstance(models.Model):
    uniqueId = models.SlugField(max_length=200, db_index=True)
    due_back = models.DateField
    LOAN_STATUS = (
        ('A', 'available'),
        ('U', 'unavailable')
    )
    status = models.CharField(max_length=1,
                            choices=LOAN_STATUS,
                            help_text="units of product")
    
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
'''
