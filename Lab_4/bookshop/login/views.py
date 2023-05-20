from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.views.generic.edit import FormView
from django.contrib.auth.forms import UserCreationForm
from django.views.generic.base import View
from django.contrib.auth import logout
from django.http import HttpResponseRedirect
from .forms import UserCreateForm 
from shop.models import Client
import requests
import json
from datetime import date
from django.core.exceptions import ValidationError





class RegisterFormView(FormView) :
    form_class = UserCreateForm
    success_url = '/auth/login/'

    template_name = 'register.html'
    print(123)

    def form_valid(self, form) -> HttpResponse:
        form.save()



        Client.objects.create(first_name=form.cleaned_data['first_name'],
                              last_name=form.cleaned_data['last_name'],
                              date_of_birth=form.cleaned_data['date_of_birth'],
                              email=form.cleaned_data['email'],
                              phone_number=form.cleaned_data['phone_number']).save()

        return super(RegisterFormView, self).form_valid(form)
    
    def form_invalid(self, form) -> HttpResponse:
        return super(RegisterFormView, self).form_invalid(form)
    
class LoginFormView(FormView) :
        form_class = AuthenticationForm

        template_name = 'login.html'

        quote = requests.get('https://favqs.com/api/qotd').json()
        def get(self, request) :
            return render(request, 'login.html', context={'form' : self.form_class(), 'quote' : self.quote['quote']['body']})

        success_url = '/'

        def form_valid(self, form) -> HttpResponse:
            self.user = form.get_user()

            login(self.request, self.user)    
            return super(LoginFormView, self).form_valid(form)
        
        
class LogoutView(FormView):
    def get(self, request):
        logout(request)

        return HttpResponseRedirect('/')