from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name = "index"),
    path('iniciarSesion/', iniciarSesion, name = "iniciarSesion"),
    path('home/', home, name = "home"),
    path('accidente/', accidente, name = "accidente"),
    path('mejora/', mejora, name = "mejora"),
    path('especial/', especial, name = "especial"),
    path('reporte/', reporte, name = "reporte"),
]