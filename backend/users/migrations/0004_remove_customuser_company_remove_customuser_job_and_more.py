# Generated by Django 5.1 on 2024-11-04 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_remove_customuser_bio"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="company",
        ),
        migrations.RemoveField(
            model_name="customuser",
            name="job",
        ),
        migrations.AddField(
            model_name="customuser",
            name="certificates",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="customuser",
            name="courses",
            field=models.JSONField(blank=True, null=True),
        ),
    ]