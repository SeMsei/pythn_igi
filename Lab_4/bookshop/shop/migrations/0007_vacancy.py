# Generated by Django 4.2.1 on 2023-09-09 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0006_article_img'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('salary', models.IntegerField()),
                ('description', models.TextField()),
            ],
        ),
    ]
