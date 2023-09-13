# Generated by Django 4.2.1 on 2023-09-11 17:00

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0016_alter_comment_mark'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='year',
            field=models.PositiveIntegerField(help_text='Use the following format: <YYYY>', validators=[django.core.validators.MinValueValidator(1900), django.core.validators.MaxValueValidator(2023)]),
        ),
    ]
