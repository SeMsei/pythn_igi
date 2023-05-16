from django.db import models
from typing import List
from django.urls import reverse

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
    author = models.ManyToManyField(Author)
    summary = models.CharField(max_length=200,
                            help_text='Enter book summry')
    imprint = models.CharField(max_length=200,
                            help_text='Enter imprint')
    image = models.ImageField(upload_to='book/%Y/%m/%d', blank=True)
    ISBN = models.CharField(max_length=200,
                            help_text='Enter ISBN')
    quantity = models.IntegerField()
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