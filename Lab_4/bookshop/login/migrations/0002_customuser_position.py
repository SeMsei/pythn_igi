# Generated by Django 4.2.1 on 2023-09-10 12:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='position',
            field=models.CharField(default='customer', max_length=200),
        ),
    ]
