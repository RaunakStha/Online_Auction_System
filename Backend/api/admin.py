from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display=['username','email']


class ProfileAdmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['user','full_name','verified']


admin.site.register(User,UserAdmin)
admin.site.register(Profile,ProfileAdmin)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(Bid)
admin.site.register(Order)
admin.site.register(UserAddress)
# Register your models here.
