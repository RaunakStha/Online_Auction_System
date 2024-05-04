from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.text import slugify
from django.utils import timezone


class Status(models.IntegerChoices):
    Active = 1
    Modified = 2
    Passive = 3

class User(AbstractUser):

    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name = models.CharField(max_length=300)
    bio = models.CharField(max_length=300)
       # location = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True, upload_to="user_images")
    verified = models.BooleanField(default=False)
        # birth_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.full_name
    

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Category(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100, null=True, blank=True)
    slug = models.SlugField(null=True, blank=True, unique=True)
    description = models.TextField(max_length=500, null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    CreatedAt = models.DateTimeField(auto_now_add=True)
    def __str__(self) -> str:
        return self.name
    
    def save(self, *args, **kwargs) -> str:
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=750, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    useStatus = models.CharField(max_length=50, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='categories')
    endDate= models.DateTimeField(default=timezone.now)
    productStatus = models.IntegerField(choices=Status.choices, default=Status.Active)
    createdAt = models.DateTimeField(auto_now_add=True)
    startDate= models.DateTimeField(default=timezone.now,null=True, blank=True)
    currentHighestBid = models.IntegerField(null=True, blank=True, default=0)
    totalBids = models.IntegerField(default=0)
    
    province = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True) 
    
    endingEmailSent = models.BooleanField(default=False)
    lastEmailSent = models.BooleanField(default=False)
    videoURL = models.FileField(null=True,blank=True, default ="default.mp4", upload_to="products_video")

    def __str__(self) -> str:
        return str(self.name)
    
    def save(self, *args, **kwargs) -> str:
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(null=True, blank=True, upload_to="products_images")
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self) -> str:
        return f'{self.product.name} - Image {self.pk}'
    
class Bid(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL,null=True ,related_name='bids')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    bid = models.IntegerField(null=False, blank=False, default=0)
    paidAmount = models.IntegerField(null=False, blank=False, default=0)
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return f'{self.user.username} bidded {self.bid} to {self.product.name}'
    

class UserAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses',null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    province = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    postalCode = models.CharField(max_length=100, null=True, blank=True)
    mobile = models.CharField(max_length=10, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    firstName = models.CharField(max_length=200, null=True, blank=True)
    lastName = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.user.username}: {self.name}'


class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders_as_buyer')
    seller = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders_as_seller')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='order_product')
    address = models.ForeignKey(UserAddress, on_delete=models.SET_NULL, null=True, related_name='order_address')
    isConformed = models.BooleanField(default=False)
    conformedAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isShipping = models.BooleanField(default=False)
    shippingAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    shippingCode = models.CharField(max_length=100, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return f'{self.product} bought by {self.buyer} from {self.seller}'
    
    def save(self, *args, **kwargs) -> None:
        if self.isConformed is True and self.conformedAt is None:
            self.conformedAt = timezone.now()
        if self.isDelivered is True and self.deliveredAt is None:
            self.deliveredAt = timezone.now()
        if self.isShipping is True and self.shippingAt is None:
            self.shippingAt = timezone.now()

        super().save(*args, **kwargs)


