from django.shortcuts import render
from .models import Producto

def home(request):
    productos = Producto.objects.all()
    # Si no hay productos en la BD, usaremos los de prueba temporalmente en el template
    return render(request, 'index.html', {'productos': productos})
