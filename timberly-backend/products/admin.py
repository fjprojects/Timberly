from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("sku", "name", "category", "price", "stock", "is_available")
    search_fields = ("sku", "name", "category")
    list_filter = ("category", "is_available")
    list_editable = ("price", "stock", "is_available")
