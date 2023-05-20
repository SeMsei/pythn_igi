from django.shortcuts import render
from .models import OrderItem
#from .forms import OrderCreateForm
from cart.cart import Cart
from shop.models import Client
from .models import Order
from django.core.exceptions import PermissionDenied


def order_create(request):
    '''
    pt = dict()

    x = []
    y = []

    for ord in Order.objects.all():
        pt[str(ord.created.year) + '.'+str(ord.created.month)+'.'+str(ord.created.day)] = 0

    for ord in Order.objects.all():
        pt[str(ord.created.year) + '.'+str(ord.created.month)+'.'+str(ord.created.day)] += 1

    for tmp in pt:
        x.append(tmp)
        y.append(pt[tmp])

    plt.plot(x,y, 'ro')
    plt.savefig('foo.png')
    plt.clf()
    '''



    if not request.user.is_authenticated:
        raise PermissionDenied("net dostpa")

    cart = Cart(request)
    if request.method == 'POST':        
        order = Order.objects.create(client = Client.objects.filter(email=request.user.email).first())

        for item in cart:
            OrderItem.objects.create(order=order,
                                        book=item['book'],
                                        price=item['price'],
                                        quantity=item['quantity'])
            item['book'].purchase_count += item['quantity']
            item['book'].save()
        # очистка корзины
        cart.clear()
        return render(request, 'order/created.html',
                        {'order': order})
    
    return render(request, 'order/create.html',
                  {'cart': cart})