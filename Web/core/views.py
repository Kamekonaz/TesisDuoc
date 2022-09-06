from django.shortcuts import redirect, render

from .models import *

# Create your views here.


def index(request):
    return render(request, 'core/index.html')





def iniciarSesion(request):
    
    return render(request, 'core/iniciarSesion.html')

def home(request):

    return render(request, 'cliente/home.html')
def accidente(request):

    return render(request, 'cliente/accidente.html')
def especial(request):

    return render(request, 'cliente/especial.html')

def mejora(request):

    return render(request, 'cliente/mejora.html')
def reporte(request):

    return render(request, 'cliente/reporte.html')




