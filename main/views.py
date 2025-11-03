from django.shortcuts import render, redirect
from .models import *

def home(request):
    achievements = Achievements.objects.all()
    partners = Partners.objects.all()
    projects = Projects.objects.all()[:3]
    services = Services.objects.all()
    
    for ach in achievements:
        print(ach.title)
        print(f' stackfile {ach.image_url}')
    return render(request, 'main/home.html', locals())

def about(request):
    return render(request, 'main/about.html', locals())

def contact(request):
    if request.method == 'POST':
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        contact = Contact.objects.create(last_name=last_name, email=email, message=message)
        print ={'message': 'Le formulaire a été soumis avec succès!'}
        return redirect('home')
    return render(request, 'main/contact.html', locals())

def details_escrud(request):
    return render(request, 'main/details_escrud.html', locals())

def details_ima(request):
    return render(request, 'main/details_ima.html', locals())

def details_julisha(request):
    return render(request, 'main/details_julisha.html', locals())

def details_laxmarket(request):
    return render(request, 'main/details_laxmarket.html', locals())

def details_laxmedical(request):
    return render(request, 'main/details_laxmedical.html', locals())

def details_mohindo(request):
    return render(request, 'main/details_mohindo.html', locals())

def details_zuzuna(request):
    return render(request, 'main/details_zuzuna.html', locals())

def prix(request):
    if request.method == 'POST':
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        contact = Contact.objects.create(last_name=last_name, email=email, message=message)
        return redirect('home')
    return render(request, 'main/prix.html', locals())

def produits(request):
    
    projects = Projects.objects.all()
    if request.method == 'POST':
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        contact = Contact.objects.create(last_name=last_name, email=email, message=message)
        return redirect('home')
    return render(request, 'main/produits.html', locals())

def realisation(request):
    achievements = Achievements.objects.all()
    partners = Partners.objects.all()
    projects = Projects.objects.all()[:3]
    services = Services.objects.all()
    
    if request.method == 'POST':
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        contact = Contact.objects.create(last_name=last_name, email=email, message=message)
        return redirect('home')
    return render(request, 'main/realisation.html', locals())

def services(request):
    if request.method == 'POST':
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        contact = Contact.objects.create(last_name=last_name, email=email, message=message)
        return redirect('home')
    return render(request, 'main/services.html', locals())

# Create your views here.
