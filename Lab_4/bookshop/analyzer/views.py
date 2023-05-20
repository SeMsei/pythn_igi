from django.shortcuts import render
from order.models import Order, OrderItem
from shop.models import Book
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from io import BytesIO
import base64
import io
import os
from django.conf import settings
from django.conf.urls.static import static
import tabulate
import pandas
import datetime
from typing import Dict
from django.core.exceptions import PermissionDenied


def table_1_show(request):
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")


    arr = list(Book.objects.all())
    arr.sort(key = lambda x:x.purchase_count, reverse=True)
    table = list()
    table.append(['Place', 'title', 'count'])
    for i in range(len(arr)):
        print(f'{i+1}:{arr[i].title}, count: {arr[i].purchase_count}')
        table.append([i,arr[i].title,arr[i].purchase_count])
    str = '<!DOCTYPE html><html><head><title>Login</title></head><body>'
    str += tabulate.tabulate(table, tablefmt='html')
    str += '    </body></html>'
    print(settings.BASE_DIR)
    #f = open(os.path.join(settings.BASE_DIR,'\\Study\\IGI\pythn_igi\\Lab_4\\bookshop\\analyzer\\templates\\tables.html'), "w")
    #f.write(str)
    #f.close()

    print(tabulate.tabulate(table, tablefmt='html'))

    return render(request, 'tables.html', context={'arr':arr})

def predict_show(request, id):
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")

    title = Book.objects.get(id=id).title

    ords = list(OrderItem.objects.all())
    date_arr = list()
    for tmp in ords:
        if tmp.book.title == title:
            print(tmp.order.created)
            date_arr.append(tmp.order.created)

    if (len(date_arr) == 0):
        return render(request, 'error_predict.html')

    min_date = min(date_arr)
    max_count = 0
    min_count = 10000
    sum = 0
    max_date = max(date_arr)

    dates_for_plot = pandas.date_range(min_date, max_date + datetime.timedelta(days=1)).strftime("%Y-%m-%d").to_list()
    print(dates_for_plot)

    dict_for_plot = dict()

    for tmp in dates_for_plot:
        dict_for_plot[tmp] = 0

    for tmp in dates_for_plot:
        for tmp_ord in OrderItem.objects.all():
            if (tmp_ord.order.created.strftime("%Y-%m-%d") == tmp):
                dict_for_plot[tmp] += tmp_ord.quantity
                max_count = max(max_count,tmp_ord.quantity)
                min_count = min(min_count, tmp_ord.quantity)
                sum += tmp_ord.quantity

    avg = (max_count+min_count)/2
    coef = sum/len(dict_for_plot)
    coef = avg/coef
    coef -= 1 #coef evyj;fnm
    if (coef < 0):
        coef *= -1
    max_date += datetime.timedelta(days=1)
    print(pandas.date_range(max_date, periods = 1, freq ='d',).strftime("%Y-%m-%d").to_list())
    sz = len(dict_for_plot)
    
    for i in range(sz):
        print(max_date)
        dt = pandas.date_range(max_date, periods = 2, freq ='d',).strftime("%Y-%m-%d").to_list()[0]
        val = dict_for_plot[dates_for_plot[-(i-1)]]*coef
        dict_for_plot[dt]=round((val + avg)/2)
        max_date += datetime.timedelta(days=1)
        
    x_list = list()
    y_list = list()

    for tmp in dict_for_plot:
        x_list.append(tmp)
        y_list.append(dict_for_plot[tmp])

    plt.plot(x_list,y_list)
    plt.savefig(os.path.join(settings.MEDIA_ROOT, 'predict.jpg'), format='jpg')
    plt.close()

    print(dict_for_plot)

    return render(request, 'predict.html')


def statistic_show(request) :
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")

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

    plt.plot(x,y)
    #plt.show()
    if(request.method == "GET"):
        plt.savefig(os.path.join(settings.MEDIA_ROOT, 'schedule.jpg'), format='jpg')
        plt.close()

        return render(request, 'statistic.html')


def main_show(request):
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")

    print(request.get_full_path)
    return render(request, 'main.html')

def stupid_table(request):
    if not request.user.is_superuser:
        raise PermissionDenied("You do not have access to this page.")

    ords = list(OrderItem.objects.all())

    dates_arr = set()

    for tmp in ords:
        dates_arr.add(tmp.order.created.date().strftime("%Y-%m-%d"))

    dates_arr = list(dates_arr)
    out_dict:Dict[str,Dict[str, int]]
    out_dict = dict()
    total = dict()

    for tmp in ords:
        out_dict[tmp.book.imprint] = dict()

    for tmp in ords:
        out_dict[tmp.book.imprint][tmp.order.created.date().strftime("%Y-%m-%d")] = 0
        total[tmp.order.created.date().strftime("%Y-%m-%d")] = 0

    for tmp in ords:
        out_dict[tmp.book.imprint][tmp.order.created.date().strftime("%Y-%m-%d")] += tmp.quantity
        total[tmp.order.created.date().strftime("%Y-%m-%d")] += tmp.quantity

    out_dict['total'] = total
    print(out_dict)
    row = list()
    row.append('Publisher')
    for tmp in total:
        row.append(tmp)

    out_list = list()
    out_list.append(row)
    for tmp in out_dict:
        row = list()
        row.append(tmp)
        for tmp1 in out_dict[tmp]:
            row.append(out_dict[tmp][tmp1])

        out_list.append(row)

    print(out_list)

    return render(request, 'svod.html', context={'main_arr':out_list})