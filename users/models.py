from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone_number = models.CharField(max_length = 20)
    avatar = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)   

    def __str__(self):
        return self.username

    def avatar_url(self):
        return (self.avatar and hasattr(self.avatar, 'url') and self.avatar.url) or ''

# Create your models here.
