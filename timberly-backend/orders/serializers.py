from decimal import Decimal
from django.db import transaction
from rest_framework import serializers
from products.models import Product
from .models import Order, OrderItem

class ItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(min_value=1)
    quantity = serializers.IntegerField(min_value=1, max_value=20)

class OrderCreateSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=30)
    address = serializers.CharField(max_length=255)
    city = serializers.CharField(max_length=100)
    state = serializers.CharField(max_length=100)
    postal_code = serializers.CharField(max_length=20)
    items = ItemInputSerializer(many=True, allow_empty=False)

    def validate_items(self, value):
        if len(value) > 40:
            raise serializers.ValidationError("Too many items in one order.")
        ids = [line["product_id"] for line in value]
        if len(ids) != len(set(ids)):
            raise serializers.ValidationError("Duplicate products are not allowed.")
        return value

    @transaction.atomic
    def create(self, validated_data):
        lines = validated_data.pop("items")
        ids = [item["product_id"] for item in lines]
        products = {product.pk: product for product in
                    Product.objects.select_for_update().filter(pk__in=ids).order_by("pk")}
        for line in lines:
            product = products.get(line["product_id"])
            if product is None or not product.is_available:
                raise serializers.ValidationError({"items": "One or more products are unavailable."})
            if product.stock < line["quantity"]:
                raise serializers.ValidationError({"items": f"Not enough stock for {product.name}."})

        total = sum((products[line["product_id"]].price * line["quantity"] for line in lines), Decimal("0.00"))
        order = Order.objects.create(user=self.context["request"].user, total_amount=total, **validated_data)
        OrderItem.objects.bulk_create([
            OrderItem(order=order, product=products[line["product_id"]],
                      product_name=products[line["product_id"]].name,
                      product_sku=products[line["product_id"]].sku,
                      unit_price=products[line["product_id"]].price, quantity=line["quantity"])
            for line in lines
        ])
        for line in lines:
            product = products[line["product_id"]]
            product.stock -= line["quantity"]
            if product.stock == 0:
                product.is_available = False
            product.save(update_fields=["stock", "is_available"])
        return order

class OrderItemReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "product_name", "product_sku", "unit_price", "quantity")

class OrderReadSerializer(serializers.ModelSerializer):
    items = OrderItemReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ("id", "full_name", "total_amount", "status", "created_at", "items")
