# Generated by Django 4.2.1 on 2023-09-10 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0002_customuser_position'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='position',
        ),
    ]
