# Generated by Django 4.2.1 on 2023-05-15 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_delete_bookinstance_book_author_book_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cost',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]