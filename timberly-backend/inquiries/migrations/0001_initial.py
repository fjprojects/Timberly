from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(name="ContactMessage", fields=[
            ("id", models.BigAutoField(primary_key=True, serialize=False)),
            ("name", models.CharField(max_length=120)),
            ("email", models.EmailField(max_length=254)),
            ("subject", models.CharField(max_length=180)),
            ("message", models.TextField()),
            ("created_at", models.DateTimeField(auto_now_add=True)),
        ]),
    ]
