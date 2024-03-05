from django_filters import rest_framework as filters
from django_filters.filters import ModelChoiceFilter
from .models import Product, Category, Status
from django.contrib.auth.models import User
from django.db.models import Q

def get_all_children(category):
    _children = []
    def _get_children(categories):
        for category in categories:
            _children.append(category._id)
            _get_children(category.children.all())
                
    _get_children(category.children.all())
    _children.append(category._id)
    return _children

class ProductFilter(filters.FilterSet):
        
    search = filters.CharFilter(method='search_filter', label='Search a product, brand or category')
    
    productStatus = filters.ChoiceFilter(
        choices = (
            (Status.Active.value, 'Active'),
            (Status.Inactive.value, 'Modified'),
            ('all', 'All Products'),
        ),
        label = 'Product Status',
        method = 'status_filter'
    )

    category = filters.ModelChoiceFilter(
        method = 'filter_by_all_subcategories',
        queryset = Category.objects.all(),
        label = 'Select a category'
    )

    # user = ModelChoiceFilter(
    #     queryset = User.objects.all(),
    #     label = 'User from user email'
    # )

    class Meta:
        model = Product
        fields = []

    def filter_by_all_subcategories(self, queryset, name, value):
        all_categories = get_all_children(value)
        return queryset.filter(category__in=all_categories)
    
    def status_filter(self, queryset, name, value):
        if value == 'all':
            return queryset.exclude(productStatus=Status.sold.value)
        return queryset.filter(productStatus=value)
        
    def search_filter(self, queryset, name, value):
        matching_categories = Category.objects.filter(name__icontains=value)
        all_categories = []
        for category in matching_categories:
            all_categories.extend(get_all_children(category))
        return queryset.filter(
            Q(category__in=all_categories) |
            Q(name__icontains=value)
        )
