from rest_framework import generics
from ..models import Product,Bid
from ..serializer import ProductSerializer
from ..filters import ProductFilter

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView



class ProductList(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ['name', 'price', 'endDate']

class ProductDetail(RetrieveUpdateDestroyAPIView):
    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..tasks import send_end_auction_email

@api_view(['POST'])
def end_auction(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Update the product status to "Passive" or perform any other necessary actions
    product.productStatus = 3
    product.save()

    # Get the highest bid for the product
    highest_bid = Bid.objects.filter(product=product).order_by('-bid').first()

    if highest_bid:
        highest_bidder_email = highest_bid.user.email

        print("Calling send_end")
         # Check if the email has already been sent
        if not product.endingEmailSent:
            # Send email here
        # Call Celery task to send end auction email asynchronously
            send_end_auction_email(product_id, highest_bidder_email)
            # Once email is sent successfully, update the flag
            product.endingEmailSent = True
            product.save()

    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['POST'])
def addproducts(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data)

