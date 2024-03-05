from rest_framework import generics
from ..models import Product, Category, Status
from ..serializer import ProductSerializer
from ..filters import ProductFilter

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter



class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ['name', 'price', 'endDate']

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
