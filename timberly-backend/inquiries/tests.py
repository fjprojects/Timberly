from django.test import TestCase
from rest_framework.test import APIClient
from .models import ContactMessage

class ContactApiTests(TestCase):
    def test_message_can_be_saved(self):
        client = APIClient()
        response = client.post("/api/contact/", {
            "name": "Customer", "email": "customer@example.com",
            "subject": "Delivery", "message": "When is delivery available?",
        }, format="json")
        self.assertEqual(response.status_code, 201, response.data)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_invalid_email_rejected(self):
        response = APIClient().post("/api/contact/", {
            "name": "Customer", "email": "not-email",
            "subject": "Hello", "message": "Question",
        }, format="json")
        self.assertEqual(response.status_code, 400)
