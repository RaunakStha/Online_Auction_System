from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..filters import OrderFilter

from ..serializer import BuyingOrderSerializer, OrderDetailSerializer, ConfirmedOrderSerializer
from ..models import Order
from django_filters.rest_framework import DjangoFilterBackend
import base64
import json
from datetime import timedelta
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.utils import timezone

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
    
def payment_response(request):
    encoded_data = request.GET.get('data')
    if not encoded_data:
        return JsonResponse({'status': 'error', 'message': 'No data provided'}, status=400)

    decoded_data = base64.b64decode(encoded_data).decode('utf-8')
    response_data = json.loads(decoded_data)
    transaction_status = response_data.get('status')
    print(response_data)   
    # if transaction_status == 'COMPLETE':



    #     selected_plan_id = request.session.get('selected_plan_id')
    #     if not selected_plan_id:
    #         return JsonResponse({'status': 'error', 'message': 'Selected plan ID not found in session'}, status=400)

        # selected_plan = get_object_or_404(SubscriptionPlan, id=selected_plan_id)

        # # Determine if there is an existing active transaction
        # latest_transaction = Transaction.objects.filter(user=request.user).order_by('-expiration_date').first()
        # if latest_transaction and latest_transaction.expiration_date > timezone.now():
        #     # If existing active transaction, extend the existing expiration date
        #     new_expiration_date = latest_transaction.expiration_date + timedelta(days=selected_plan.months * 30)
        # else:
        #     # No active transaction or past expiration, start a new period from today
        #     new_expiration_date = timezone.now() + timedelta(days=selected_plan.months * 30)

        # # Store transaction details in the database
        # transaction = Transaction.objects.create(
        #     user=request.user if request.user.is_authenticated else None,
        #     subscription_plan=selected_plan,
        #     transaction_uuid=transaction_uuid,
        #     transaction_code=transaction_code,
        #     expiration_date=new_expiration_date
        # )
        # transaction.save()


        # # Send email notification
        # user = request.user if request.user.is_authenticated else None
        # if user and user.email:
        #     subject = 'Payment Successful'
        #     message = f'Hi {user.username}, you have booked a trainer. Your payment was successful. Your transaction code is {transaction_code}.'
        #     recipient_list = [user.email]
        #     send_email_to_client(subject, message, recipient_list)

        # return HttpResponseRedirect('/subscription')
    # else:
    #     return JsonResponse({'status': 'failed', 'message': 'Transaction incomplete'})

    # return JsonResponse({'status': 'error', 'message': 'Unexpected error occurred'}, status=500)