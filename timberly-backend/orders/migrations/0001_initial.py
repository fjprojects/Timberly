from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("products", "0002_product_sku"),
    ]
    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("full_name", models.CharField(max_length=150)),
                ("email", models.EmailField(max_length=254)),
                ("phone", models.CharField(max_length=30)),
                ("address", models.CharField(max_length=255)),
                ("city", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=100)),
                ("postal_code", models.CharField(max_length=20)),
                ("total_amount", models.DecimalField(max_digits=12, decimal_places=2)),
                ("status", models.CharField(max_length=20, choices=[("placed", "Placed"), ("processing", "Processing"), ("shipped", "Shipped"), ("delivered", "Delivered"), ("cancelled", "Cancelled")], default="placed")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("user", models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=django.db.models.deletion.PROTECT, related_name="timberly_orders")),
            ],
        ),
        migrations.CreateModel(
            name="OrderItem",
            fields=[
                ("id", models.BigAutoField(primary_key=True, serialize=False)),
                ("product_name", models.CharField(max_length=200)),
                ("product_sku", models.CharField(max_length=50)),
                ("unit_price", models.DecimalField(max_digits=10, decimal_places=2)),
                ("quantity", models.PositiveIntegerField()),
                ("order", models.ForeignKey(to="orders.order", on_delete=django.db.models.deletion.CASCADE, related_name="items")),
                ("product", models.ForeignKey(to="products.product", on_delete=django.db.models.deletion.PROTECT)),
            ],
        ),
    ]
