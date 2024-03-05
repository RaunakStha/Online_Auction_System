from ..models import Category
from ..serializer import CategorySerializer

from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend


class CategoryList(generics.ListAPIView):
    
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend,]
    filterset_fields = ('children',)

class CategoryDetail(generics.RetrieveAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()