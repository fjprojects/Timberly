from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ("product", "product_name", "product_sku", "unit_price", "quantity")
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "full_name", "total_amount", "status", "created_at")
    search_fields = ("full_name", "email", "user__username")
    list_filter = ("status", "created_at")
    readonly_fields = ("user", "total_amount", "created_at")
    inlines = [OrderItemInline]
