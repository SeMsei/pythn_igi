from django.shortcuts import render
from .models import OrderItem
#from .forms import OrderCreateForm
from cart.cart import Cart
from shop.models import Client
from login.models import CustomUser
from .models import Order
from django.core.exceptions import PermissionDenied
from .forms import OrderCreateForm


def order_create(request):
    if not request.user.is_authenticated:
        raise PermissionDenied("net dostpa")

    cart = Cart(request)
    if request.method == 'POST': 
        print(request.user.email)      
        #order = Order.objects.create(client = CustomUser.objects.filter(email=request.user.email).first())
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            #order = form.save(commit=False)
            order = Order.objects.create(client = CustomUser.objects.filter(email=request.user.email).first())
            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = cart.coupon.discount
            
            for item in cart:
                OrderItem.objects.create(order=order,
                                            book=item['book'],
                                            price=item['price'],
                                            quantity=item['quantity'],
                                            cost=item['price']*item['quantity'])
                item['book'].purchase_count += item['quantity']
                item['book'].save()
            # очистка корзины
            cart.clear()
            order.get_total_cost()
            order.save()
            del request.session['coupon_id']
            return render(request, 'order/created.html',
                            {'order': order})
    
    return render(request, 'order/create.html',
                  {'cart': cart})