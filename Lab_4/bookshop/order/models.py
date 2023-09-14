from django.db import models
from shop.models import Book, Client
from login.models import CustomUser
from coupons.models import Coupon
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator

class Order(models.Model):
    client = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    created = models.DateTimeField(auto_now_add=True)

    coupon = models.ForeignKey(Coupon,
                                related_name='orders',
                                null=True,
                                blank=True, on_delete=models.CASCADE)
    discount = models.IntegerField(default=0,
                                    validators=[MinValueValidator(0),
                                                MaxValueValidator(100)])
    total_cost = models.IntegerField(default=0)

    class Meta:
        ordering = ('-created',)
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return 'Order {}'.format(self.id)

    def get_total_cost(self):
        total_cost1 = sum(item.get_cost() for item in self.items.all())
        self.total_cost = total_cost1 - total_cost1 * (self.discount / Decimal('100'))
        return total_cost1 - total_cost1 * (self.discount / Decimal('100'))
        #return sum(item.get_cost() for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    cost = models.PositiveIntegerField(default=0)

    def __str__(self):
        return '{}'.format(self.id)

    def get_cost(self):
        self.cost = self.price * self.quantity
        return self.price * self.quantity