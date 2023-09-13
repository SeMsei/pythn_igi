from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import CustomUser

User = get_user_model()
admin.site.register(User)

#@admin.register(CustomUser)
#class UserAdmin(admin.ModelAdmin) :
list_display = ['first_name', 'last_name', 'date_of_birth',
                    'email', 'phone_number']