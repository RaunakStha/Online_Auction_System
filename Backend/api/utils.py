from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from dotenv import load_dotenv
import os
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
load_dotenv()
from django.core.mail import send_mail

from .models import Order


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.id) + six.text_type(timestamp) + six.text_type(user.is_active)
        )


def send_email_cleint(mail_subject, message, html_message, user_list):
    """
    Send an email with both plain text and HTML content.
    :param mail_subject: Subject of the email
    :param message: Plain text version of the message
    :param html_message: HTML version of the message
    :param user_list: List of email recipients
    """
    from_email = settings.DEFAULT_FROM_EMAIL
    email = EmailMultiAlternatives(
        subject=mail_subject,
        body=message,  # this is the plain text version of the email
        from_email=from_email,
        to=user_list
    )
    email.attach_alternative(html_message, "text/html")  # attaching the HTML version
    email.send()
    print("Email sent successfully")



def create_order(product, winner):
    new_order = Order.objects.create(
        buyer = winner,
        seller = product.user,
        product = product,
    )

    new_order.save()

    return "New order created."

