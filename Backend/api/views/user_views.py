from rest_framework.exceptions import NotFound
from django.shortcuts import render
from django.http import HttpResponse
from api.models import Profile, User
from api.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerilizer, ProfileSerializer,PasswordResetRequestSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.utils.encoding import force_str
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import smart_str, force_str,smart_bytes, force_bytes
from django.contrib.auth import get_user_model, authenticate
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
import random
from django.utils import timezone
from django.conf import settings
from ..tasks import send_verification_email, send_otp_email

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class MyTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
            send_otp_email(user.email, otp)  # Assuming you have the email in your task parameters
            return Response({"message": "OTP has been sent to your email."}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials or account not verified"}, status=status.HTTP_400_BAD_REQUEST)

class OTPVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            user = User.objects.get(email=email)
            if user.otp == otp and user.otp_is_valid():
                user.otp = None
                user.otp_created_at = None
                user.save()
                refresh = MyTokenObtainPairSerializer.get_token(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid or expired OTP'}, status=400)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerilizer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Registration successful, please check your email to verify your account."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            user = User.objects.get(verification_token=token)
            if not user.is_verified:
                user.is_verified = True
                user.is_active = True
                user.save()
                return Response({"message": "Your account has been verified. You can now login."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "This account is already verified."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "Invalid verification link."}, status=status.HTTP_404_NOT_FOUND)

class ResendVerificationEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            if not user.is_verified:
                send_verification_email(user.id, str(user.verification_token))
                return Response({'message': 'Verification email has been resent.'}, status=status.HTTP_200_OK)
            return Response({'message': 'This email is already verified.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)


class UserProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.profile
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            raise NotFound("Profile not found for this user.")

    def put(self, request):
        # Update profile details
        profile = request.user.profile
        profile_serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()

        # Update user email and password
        user = request.user
        user_serializer = UserSerializer(user, data=request.data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()

        # Check if any serializer encountered errors
        if profile_serializer.errors or user_serializer.errors:
            errors = {**profile_serializer.errors, **user_serializer.errors}
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)

    def delete(self, request):
        try:
            # Delete profile
            profile = request.user.profile
            profile.delete()

            # Delete user
            user = request.user
            user.delete()

            return Response({"message": "Profile and user deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        

class PasswordResetRequestView(APIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = serializer.get_user(email)
        if user:
            encoded_uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f"http://localhost:3000/reset-password/{encoded_uid}/{token}"
            send_mail(
                'Reset your password',
                f'Click the link to reset your password: {reset_url}',
                'np03cs4s220126@heraldcollege.edu.np',
                [email],
                fail_silently=False,
            )
        return Response({'detail': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
    

class PasswordResetView(APIView):
    def post(self, request):
        User = get_user_model()
        uid = force_str(urlsafe_base64_decode(request.data.get('uid')))
        token = request.data.get('token')
        password = request.data.get('password')
        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        if not default_token_generator.check_token(user, token):
            return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()
        return Response({'detail': 'Password reset successful.'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        'api/products/',
        'api/categories/',
        'api/bids/',
    ]
    return Response(routes)


@api_view(['GET','POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])

def dashboard(request):
    if request.method =="GET":
        response = f"hey {request.user}, You are Seeing a GET response"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method =="POST":
        text = request.POST.get("text")
        response = f"hey {request.user}, You are Seeing a POST response with {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# def getUserProfile(request):
#     user = request.user
#     serializer = UserSerializer(user, many=False)
#     return Response(serializer.data)








# Create your views here.
