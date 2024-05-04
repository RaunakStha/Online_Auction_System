from django.utils import timezone
from datetime import timedelta
from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from celery import shared_task
from .utils import send_ending_email, send_winner_email, send_loser_email, create_order, send_email_cleint
from .models import Product, Status,Bid


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


