from decimal import Decimal
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from products.models import Product
from .models import Order, OrderItem

class OrderApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="timberly_buyer", password="StrongTestPass123!")
        self.other = User.objects.create_user(username="someone_else", password="StrongTestPass123!")
        self.product = Product.objects.create(sku="TAB-1", name="Oak Table", description="Solid wood",
            price=Decimal("2500.00"), category="Table", stock=3, is_available=True)
        self.payload = {
            "full_name": "Example Buyer", "email": "buyer@example.com", "phone": "9876543210",
            "address": "10 Main Street", "city": "Thrissur", "state": "Kerala", "postal_code": "680001",
            "items": [{"product_id": self.product.id, "quantity": 2}],
        }

    def test_orders_require_authentication(self):
        self.assertEqual(self.client.get("/api/orders/").status_code, 401)
        self.assertEqual(self.client.post("/api/orders/", self.payload, format="json").status_code, 401)

    def test_order_uses_server_price_and_reduces_stock(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/orders/", {**self.payload, "total_amount": "1.00"}, format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(Decimal(response.data["total_amount"]), Decimal("5000.00"))
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 1)
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(OrderItem.objects.count(), 1)

    def test_insufficient_stock_does_not_create_order(self):
        self.client.force_authenticate(user=self.user)
        self.payload["items"][0]["quantity"] = 4
        response = self.client.post("/api/orders/", self.payload, format="json")
        self.assertEqual(response.status_code, 400)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock, 3)
        self.assertEqual(Order.objects.count(), 0)

    def test_duplicate_items_rejected(self):
        self.client.force_authenticate(user=self.user)
        self.payload["items"].append(self.payload["items"][0].copy())
        response = self.client.post("/api/orders/", self.payload, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Order.objects.count(), 0)

    def test_cannot_view_another_users_orders(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/orders/", self.payload, format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.client.force_authenticate(user=self.other)
        response = self.client.get("/api/orders/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 0)
