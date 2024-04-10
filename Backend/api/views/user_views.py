from django.shortcuts import render

from api.models import Profile, User
from api.serializer import UserSerializer, MyTokenObtainPairSerializer, RegisterSerilizer, ProfileSerializer
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


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
    permission_classes = (AllowAny ,)
    serializer_class = RegisterSerilizer

class UserProfileDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        profile = request.user.profile
        profile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    


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


@api_view(['GET','POST'])
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





# Create your views here.
