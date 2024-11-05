from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    last_trajectory = models.JSONField(null=True, blank=True)
    courses = models.JSONField(null=True, blank=True)
    certifications = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.username