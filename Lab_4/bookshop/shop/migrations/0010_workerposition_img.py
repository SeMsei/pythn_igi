# Generated by Django 4.2.1 on 2023-09-10 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0009_workerposition'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerposition',
            name='img',
            field=models.ImageField(default='', upload_to=''),
            preserve_default=False,
        ),
    ]