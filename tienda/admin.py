from django.contrib import admin
from .models import Categoria, Producto, Pedido, ItemPedido

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'categoria')
    search_fields = ('nombre',)

admin.site.register(Categoria)
admin.site.register(Pedido)
admin.site.register(ItemPedido)
