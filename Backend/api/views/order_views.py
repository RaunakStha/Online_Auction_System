from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..filters import OrderFilter

from ..serializer import BuyingOrderSerializer, OrderDetailSerializer, ConfirmedOrderSerializer
from ..models import Order
from django_filters.rest_framework import DjangoFilterBackend

class BuyingOrderList(generics.ListAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = BuyingOrderSerializer
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConformed=False)

class OrderDetail(generics.RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()

class BaseConfirmedOrderList(generics.ListAPIView):
    
        permission_classes = [IsAuthenticated]
        serializer_class = ConfirmedOrderSerializer
        filter_backends = (DjangoFilterBackend,)
        filterset_class = OrderFilter

class ForBuyerOrderList(BaseConfirmedOrderList):
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user, isConformed=True)
        
class ForSellerOrderList(BaseConfirmedOrderList):
    
    def get_queryset(self):
        return Order.objects.filter(seller=self.request.user, isConformed=True)
    