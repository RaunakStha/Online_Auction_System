from django.urls import path
from ..views.product_views import *

urlpatterns = [
    path('', ProductList.as_view(), name ='products',),
    path('<int:product_id>/end/', end_auction, name='end_auction'),
    path('<int:pk>/', ProductDetail.as_view(), name ='product_detail',), 
    path('add/', addproducts, name ='add_product',), 
]