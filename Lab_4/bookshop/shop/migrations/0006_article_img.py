# Generated by Django 4.2.1 on 2023-09-09 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_partner_company_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='img',
            field=models.ImageField(default='null', upload_to=''),
            preserve_default=False,
        ),
    ]
