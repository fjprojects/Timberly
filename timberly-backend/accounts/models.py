from django.db import models
CATEGORY_CHOICES = [
    ("chair", "Chair"),
    ("table", "Table"),
    ("sofa", "Sofa"),
    ("bed", "Bed"),
    ("storage", "Storage"),
]

category = models.CharField(
    max_length=50,
    choices=CATEGORY_CHOICES
)
# Create your models here.
