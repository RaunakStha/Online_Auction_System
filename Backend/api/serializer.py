from api.models import User, Profile
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta

from .models import *

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email', 'password','name','isAdmin']
        extra_kwargs = {'password': {'write_only': True}}

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        return token
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name', 'bio', 'image', 'verified']  # Add other profile fields as needed
        read_only_fields = ['user']  # Set user field as read-only

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        # Update other profile fields as needed
        instance.save()

        # If you want to update the email field of the related User model
        user = instance.user
        user.email = validated_data.get('email', user.email)
        user.save()
    def delete(self, instance):
        instance.delete()

class RegisterSerilizer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2')
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
            
        return attrs
        
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'], 
        )
        
        user.set_password(validated_data['password'])
        user.save()
        
        return user
    
    

    
class ProductImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductImage
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    seller = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['_id','images','slug','name','seller','videoURL','description','productStatus','useStatus','province','district','category','price','currentHighestBid','startDate','endDate','totalBids']

    def create(self, validated_data):
       images = self.context['request'].FILES.getlist('images') 
       user = self.context['request'].user
       start_date =  timezone.localtime(timezone.now())
    #    validated_data.pop('startDate', None)
       product = Product.objects.create(user=user, startDate=start_date, **validated_data)

       for image in images:
            ProductImage.objects.create(product=product, image=image)
        
       return product
    
    def get_seller(self, obj):
        return obj.user.first_name
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['_id','name','slug','description','CreatedAt','subCategory']
    
    subCategory = serializers.SerializerMethodField()

    def get_subCategory(self, obj):
        if obj.children.exists():
            return CategorySerializer(obj.children.all(), many=True, context=self.context).data
        else:
            return []
        
class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    addressName = serializers.CharField(source = 'name')
    
    class Meta:
        model = UserAddress
        fields = '__all__'

    def validate_addressName(self, value):
        user = self.context['request'].user
        if UserAddress.objects.filter(user=user, name=value).exists():
            raise serializers.ValidationError(
                {
                    'detail': 'User address with this address name already exists.'
                }
            )
        return value
    

class BidSerializer(serializers.ModelSerializer):
    productName = serializers.ReadOnlyField(source= 'product.name')
    userName = serializers.ReadOnlyField(source= 'user.full_name')
    productSlug = serializers.ReadOnlyField(source= 'product.slug')
    ProductImage = serializers.SerializerMethodField()
    isMaxBid = serializers.SerializerMethodField()
    isFinish = serializers.SerializerMethodField()

    class Meta:
        model = Bid
        fields = '__all__'

    def get_ProductImage(self, obj):
        product_image = obj.product.images.first()
        request = self.context['request']
        if product_image:
            return request.build_absolute_uri(product_image.image.url)
        return None
    
    def get_isMaxBid(self, obj):
        max_bid = obj.product.bids.order_by('-bid').first()
        if obj == max_bid:
            return True
        return False
    
    def get_isFinish(self, obj):
        status = obj.product.productStatus
        if status == Status.Passive:
            return True
        return False
    
    def validate_bid(self, value):
        product = self.context['request'].data.get('product')

        if Product.objects.get(_id = product).user == self.context['request'].user:
            raise serializers.ValidationError(
                {
                    'detail': 'You can not bid your product.'
                }
            )
        if Bid.objects.filter(bid__gte=value, product=product).exists():
            raise serializers.ValidationError(
                {
                    'detail': 'A bid equal to or higher than this already  exists for this product.'
                }
            )
        if Product.objects.get(_id = product).price >= value:
            raise serializers.ValidationError(
                {
                    'detail': 'The bid amount should be greater than the product price.'
                }
            )
        return value
    

class OrderDetailSerializer(serializers.ModelSerializer):
    ProductName = serializers.SerializerMethodField(read_only=True)
    ProductImage = serializers.SerializerMethodField(read_only=True)
    paidPrice = serializers.SerializerMethodField(read_only=True)
    seller = serializers.SerializerMethodField(read_only=True)
    buyer = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        
    def get_ProductName(self, obj):
        return obj.product.name

    def get_ProductImage(self, obj):
        product_image = obj.product.images.first()
        request = self.context['request']
        if product_image:
            return request.build_absolute_uri(product_image.image.url)
        return None

    def get_paidPrice(self, obj):
        return obj.product.currentHighestBid
    
    def get_seller(self, obj):
        return obj.seller.first_name
    
    def get_buyer(self, obj):
        return obj.buyer.first_name
    

class BuyingOrderSerializer(OrderDetailSerializer):

    class Meta:
        model = Order
        fields = ['_id', 'productName', 'productImage', 'paidPrice', 'seller', 'createdAt']
        

class ConfirmedOrderSerializer(OrderDetailSerializer):

    class Meta:
        model = Order
        fields = ['_id', 'productName', 'productImage', 'paidPrice', 'seller', 'buyer', 'confirmedAt', 'address', 'isShipping', 'shippingAt', 'shippingCode', 'isDelivered', 'deliveredAt']