from django import forms
from .models import Book, Comment, INT_CHOICES


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'summary', 'imprint', 'image', 'ISBN', 'genre', 'language','cost']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['text', 'mark']
        widgets = {'mark': forms.Select(choices=INT_CHOICES),
                   'text': forms.Textarea(attrs={'spellcheck': 'true', 'dir': 'auto'})}
