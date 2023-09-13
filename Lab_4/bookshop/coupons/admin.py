from django.contrib import admin
from .models import Coupon

#@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['code', 'discount', 'active']
    list_filter = ['active']
    search_fields = ['code']
admin.site.register(Coupon, CouponAdmin)