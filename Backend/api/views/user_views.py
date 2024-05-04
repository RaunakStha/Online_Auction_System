from rest_framework.exceptions import NotFound
from django.shortcuts import render

from api.models import Profile, User
from api.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerilizer, ProfileSerializer,PasswordResetRequestSerializer
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
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    # permission_classes = (AllowAny ,)
    serializer_class = RegisterSerilizer




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
