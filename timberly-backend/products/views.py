from django.db.models import Q
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Product
from .serializers import ProductSerializer

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(is_available=True, stock__gt=0)
        search = self.request.query_params.get("search", "").strip()
        category = self.request.query_params.get("category", "").strip()
        ordering = self.request.query_params.get("ordering", "")
        if search:
            queryset = queryset.filter(Q(name__icontains=search) | Q(description__icontains=search) | Q(category__icontains=search))
        if category:
            queryset = queryset.filter(category__iexact=category)
        if ordering in ("price", "-price", "name", "-name"):
            return queryset.order_by(ordering, "id")
        return queryset.order_by("id")

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.filter(is_available=True)
    serializer_class = ProductSerializer
