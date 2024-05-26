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
    }
    html_message = render_to_string('end_auction.html', context)
    plain_message = strip_tags(html_message)
    # recipient_list=[highest_bidder_email]
    print([highest_bidder_email])
    # Send email
    send_email_cleint(
        subject,
        plain_message,
        html_message,  
        [highest_bidder_email]
    )



@shared_task
def send_verification_email(user_id, token):
    user = User.objects.get(pk=user_id)
    print(f"Sending email to {user.email} with token {token}")

    subject = "Verify your email"
    context = {
        'username': user.username,
        'token': token
    }
    html_message = render_to_string('activate_email.html', context)
    plain_message = strip_tags(html_message)
    recipient_list = [user.email]

    # Correct function call with all required arguments
    send_email_cleint(subject, plain_message, html_message, recipient_list)
    print("Email sent to", user.email)

@shared_task
def send_otp_email(email,otp):
    # user = User.objects.get(pk=user_id)
    """
    Sends an OTP email to the user.
    """
    subject = "Your Login OTP"
    context= {'otp': {otp}}
    html_message = render_to_string('otp_email.html',context)
    plain_message = strip_tags(html_message)
    send_email_cleint(subject, plain_message,html_message,[email])

@shared_task
def send_bid_lost_email(email, product_id):
    # Assuming product details are needed in the email
    product = Product.objects.get(pk=product_id)
    subject = "Auction Ended for Product: {}".format(product.name)
    context = {
        'username': User.username,
        'product': product,
        'highest_bid': product.currentHighestBid,
        'price': product.price,
        'description': product.description,
    }
    html_message = render_to_string('loser_email.html', context)
    plain_message = strip_tags(html_message)
    # recipient_list=[email]
    print([email])
    # Send email
    send_email_cleint(
        subject,
        plain_message,  
        html_message,
        [email]
    )

