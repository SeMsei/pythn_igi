# Generated by Django 4.2.1 on 2023-09-10 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0011_rename_full_answer_faq_answer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='faq',
            name='date',
            field=models.DateField(default='1970-1-1'),
            preserve_default=False,
        ),
    ]
