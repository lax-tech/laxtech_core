from django.db import models

class Contact(models.Model):
    last_name = models.CharField(max_length = 100, null = True, blank = True)
    email = models.EmailField(null = True, blank = True)
    message = models.TextField(null = True, blank = True) 
    
    
class Projects(models.Model):
    name = models.CharField(max_length = 200, null = True, blank = True)
    description = models.TextField(null = True, blank = True)
    link = models.URLField(null = True, blank = True)
    image = models.ImageField(upload_to='projects/', null = True, blank = True)
    
    @property
    def image_url(self):
        return (self.image and hasattr(self.image, 'url') and self.image.url) or '/static/assets/img/logo/logo.png'


class Achievements(models.Model):
    title = models.CharField(max_length = 200, null = True, blank = True)
    description = models.TextField(null = True, blank = True)
    image = models.ImageField(upload_to='achievements/', null = True, blank = True)
    link = models.URLField(null = True, blank = True)
    
    @property
    def image_url(self):
        return (self.image and hasattr(self.image, 'url') and self.image.url) or '/static/assets/img/logo/logo.png'

          
class Team_members(models.Model):
    member_name = models.CharField(max_length = 100, null = True, blank = True)
    member_role = models.CharField(max_length = 100, null = True, blank = True)
    member_photo = models.ImageField(upload_to='team_members/', null = True, blank = True)
    member_bio = models.TextField(null = True, blank = True)

class Services(models.Model):
    name = models.CharField(max_length = 200, null = True, blank = True)
    description = models.TextField(null = True, blank = True)
    image = models.ImageField(upload_to='services/', null = True, blank = True)
    
    @property
    def image_url(self):
        return (self.image and hasattr(self.image, 'url') and self.image.url) or '/static/assets/img/logo/logo.png'

    

class Partners(models.Model):
    name = models.CharField(max_length = 200, null = True, blank = True)
    logo = models.ImageField(upload_to='partners/', null = True, blank = True)
    website = models.URLField(null = True, blank = True)
    ligne = models.CharField(max_length = 200, null = True, blank = True)
    
    @property
    def logo_url(self):
        return (self.logo and hasattr(self.logo, 'url') and self.logo.url) or '/static/assets/img/logo/logo.png'

            
# Create your models here.
