from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.text import slugify


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
    image = models.ImageField(default="default.jpg", upload_to="user_images")
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
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.SlugField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=750, null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    useStatus = models.CharField(max_length=50, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='categories')
    endDate= models.DateTimeField()
    productStatus = models.IntegerField(choices=Status.choices, default=Status.Active)
    createdAt = models.DateTimeField(auto_now_add=True)
    startDate= models.DateTimeField(null=True, blank=True)
    currentHighestBid = models.IntegerField(null=True, blank=True, default=0)
    totalBids = models.IntegerField(default=0) 
    endingEmailSent = models.BooleanField(default=False)
    lastEmailSent = models.DateTimeField(default=False)
    videoURL = models.FileField(null=True,blank=True, default ="default.mp4", upload_to="products_video")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return self.name
    
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

