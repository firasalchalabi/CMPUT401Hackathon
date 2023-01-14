from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.
class User(AbstractUser):
    first_name = models.TextField()
    last_name = models.TextField()

class Trip(models.Model):
    destination = models.CharField(max_length=64)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Item(models.Model):
    description = models.CharField(max_length=256)
    completed = models.BooleanField(default=False)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)




