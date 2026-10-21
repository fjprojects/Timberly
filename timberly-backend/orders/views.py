from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order
from .serializers import OrderCreateSerializer, OrderReadSerializer

class OrderListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items").order_by("-created_at")

    def get_serializer_class(self):
        return OrderCreateSerializer if self.request.method == "POST" else OrderReadSerializer

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response(OrderReadSerializer(order).data, status=status.HTTP_201_CREATED)
