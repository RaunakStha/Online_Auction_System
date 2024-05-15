from django.utils import timezone
from datetime import timedelta
from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from celery import shared_task
from django.contrib.auth import get_user_model
from .utils import  send_email_cleint
from .models import Product, Status,Bid, User


@shared_task
def send_end_auction_email(product_id, highest_bidder_email):
    try:
        print("Inside send_end_auction_email task")
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        # Handle the case where the product doesn't exist
        return

    # Prepare email content
    subject = "Auction Ended for Product: {}".format(product.name)
    context = {
        'product': product,
        'highest_bid': product.currentHighestBid,
        'price': product.price,
        'description': product.description,
        'image': product.images,
    }
    html_message = render_to_string('end_auction.html', context)
    plain_message = strip_tags(html_message)
    recipient_list=[highest_bidder_email]
    print(recipient_list)
    # Send email
    send_email_cleint(
        subject,
        plain_message,  
        recipient_list,
    )



@shared_task
def send_verification_email(user_id, token):
    user = User.objects.get(pk=user_id)
    print(f"Sending email to {user.email} with token {token}")
    """
    Sends a verification email with a link to verify the user's email address.
    """
    subject = "Verify your email"
    plain_message = f"Please click on the link to verify your email: http://localhost:3000/verify/{token}/"
    recipient_list = [user.email]
    print ("send",user.email)
    send_email_cleint(subject, plain_message, recipient_list)

@shared_task
def send_otp_email(email,otp):
    # user = User.objects.get(pk=user_id)
    """
    Sends an OTP email to the user.
    """
    subject = "Your Login OTP"
    message = f"Your OTP is: {otp}"
    send_email_cleint(subject, message, [email])
