from decimal import Decimal
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Product

class ProductApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.sofa = Product.objects.create(sku="SOFA-1", name="Oak Sofa", description="Comfortable oak sofa",
            price=Decimal("14999.00"), category="Sofa", stock=5, is_available=True)
        self.chair = Product.objects.create(sku="CHAIR-1", name="Dining Chair", description="Oak dining chair",
            price=Decimal("2999.00"), category="Chair", stock=3, is_available=True)
        Product.objects.create(sku="OUT-1", name="Out of Stock", description="Unavailable item",
            price=Decimal("500.00"), category="Sofa", stock=0, is_available=False)

    def test_list_is_paginated_and_in_stock(self):
        response = self.client.get("/api/products/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 2)
        self.assertEqual(len(response.data["results"]), 2)

    def test_search_filter_and_sort(self):
        response = self.client.get("/api/products/?category=Sofa&search=Oak")
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["id"], self.sofa.id)
        response = self.client.get("/api/products/?ordering=price")
        self.assertEqual(response.data["results"][0]["id"], self.chair.id)

    def test_product_detail(self):
        response = self.client.get(f"/api/products/{self.sofa.pk}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["sku"], "SOFA-1")
