from django.db import models

class Contact(models.Model):
    last_name = models.CharField(max_length = 100, null = True, blank = True)
    email = models.EmailField(null = True, blank = True)
    message = models.TextField(null = True, blank = True) 

# Create your models here.
