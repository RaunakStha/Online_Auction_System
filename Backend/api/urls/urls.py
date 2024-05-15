from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from ..views.user_views import *
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenRefreshView
from ..views.user_views import *
from django.contrib.auth import views as auth_views

urlpatterns=[
    path("token/", MyTokenObtainPairView.as_view(), name='login'),
    path("verify-otp/", OTPVerificationView.as_view(), name='verify_otp'),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", RegisterView.as_view()),
    path('verify/<uuid:token>/', VerifyAccountView.as_view(), name='verify_account'),
    path('resend-verification-email/', ResendVerificationEmailView.as_view(), name='resend_verification_email'),
    path("addresses/", include ('api.urls.address_urls')),
    path("bids/", include ('api.urls.bid_urls')),
    path("orders/", include ('api.urls.order_urls')),
    path("dashboard/",dashboard),
    path("profile/", UserProfileDetailView.as_view()),
    path('', UserDetailView.as_view(), name='user'),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
]