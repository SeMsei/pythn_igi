# Generated by Django 4.2.1 on 2023-09-10 22:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0013_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='mark',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
