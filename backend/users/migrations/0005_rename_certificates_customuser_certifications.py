# Generated by Django 5.1 on 2024-11-04 01:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0004_remove_customuser_company_remove_customuser_job_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="customuser",
            old_name="certificates",
            new_name="certifications",
        ),
    ]
