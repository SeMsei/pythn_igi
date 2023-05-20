from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import localtime
from datetime import datetime

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=200,
                                help_text='Enter first name')
    last_name = models.CharField(max_length=200,
                                help_text='Enter last name')
    date_of_birth = models.DateField()
    email = models.EmailField()
    phone_number = models.CharField(max_length=50,
                                    help_text='Enter phone number')
    
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'date_of_birth', 'phone_number']

    def get_time():
        print(1234567)
        return str(datetime.now().strftime('%H:%M:%S'))