from . import views
from django.urls import path,include

urlpatterns = [
    path('', views.home , name='home'),
    path('about', views.about , name='about'),
    path('contact', views.contact, name='contact'),
    path('details-escrud', views.details_escrud, name='details-escrud'),
    path('details-ima', views.details_ima, name='details-ima'),
    path('details-julisha', views.details_julisha, name='details-julisha'),
    path('details-laxmarket', views.details_laxmarket, name='details-laxmarket'),
    path('details-laxmedical', views.details_laxmedical, name='details-laxmedical'),
    path('details-mohindo', views.details_mohindo, name='details-mohindo'),
    path('details-zuzuna', views.details_zuzuna, name='details-zuzuna'),
    path('prix', views.prix, name='prix'),
    path('produits', views.produits, name='produits'),
    path('realisation', views.realisation, name='realisation'),
    path('services', views.services, name='services'),

]    