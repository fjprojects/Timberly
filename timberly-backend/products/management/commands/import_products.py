import csv

from django.core.management.base import BaseCommand
from products.models import Product


class Command(BaseCommand):
    help = "Import or update products from a CSV file"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str)

    def handle(self, *args, **options):
        csv_file = options["csv_file"]

        created_count = 0
        updated_count = 0

        with open(csv_file, newline="", encoding="utf-8-sig") as file:
            reader = csv.DictReader(file)

            for row in reader:
                product, created = Product.objects.update_or_create(
                    sku=row["sku"].strip(),
                    defaults={
                        "name": row["name"].strip(),
                        "description": row["description"].strip(),
                        "price": row["price"].strip(),
                        "category": row["category"].strip(),
                        "image": row["image"].strip(),
                        "stock": int(row["stock"]),
                        "is_available": row["is_available"].strip().lower()
                        in ["true", "1", "yes"],
                    },
                )

                if created:
                    created_count += 1
                else:
                    updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Import completed: {created_count} created, "
                f"{updated_count} updated"
            )
        )