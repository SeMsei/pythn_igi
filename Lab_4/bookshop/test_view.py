from django.urls import reverse 
import pytest
import requests
import django.test.client
import pytest
import django.test.utils
from django.conf import settings


def test_home_page(): # Get the home page 
    url = 'http://127.0.0.1:8000/'
    response = requests.get(url)
    assert response.status_code == 200


def test_detail_page(): # Get the home page 
    url = 'http://127.0.0.1:8000/2'
    response = requests.get(url)
    assert response.status_code == 200

def test_horror_page(): # Get the home page 
    url = 'http://127.0.0.1:8000/Horror'
    response = requests.get(url)
    assert response.status_code == 200

def test_novel_page(): # Get the home page 
    url = 'http://127.0.0.1:8000/Novel'
    response = requests.get(url)
    assert response.status_code == 200

def test_1():
    url = 'http://127.0.0.1:8000/?sort=ascending'
    response = requests.get(url)
    assert response.status_code == 200

def test_2():
    url = 'http://127.0.0.1:8000/?sort=descending'
    response = requests.get(url)
    assert response.status_code == 200

def test_3():
    url = 'http://127.0.0.1:8000/Horror/?sort=descending'
    response = requests.get(url)
    assert response.status_code == 200

def test_4():
    url = 'http://127.0.0.1:8000/Horror/?sort=ascending'
    response = requests.get(url)
    assert response.status_code == 200

def test_5():
    url = 'http://127.0.0.1:8000/Novel/?sort=descending'
    response = requests.get(url)
    assert response.status_code == 200

def test_6():
    url = 'http://127.0.0.1:8000/Novel/?sort=ascending'
    response = requests.get(url)
    assert response.status_code == 200

def test_7():
    url = 'http://127.0.0.1:8000/cart/'
    response = requests.get(url)
    assert response.status_code == 403

def test_8():
    url = 'http://127.0.0.1:8000/order/create/'
    response = requests.get(url)
    assert response.status_code == 403

def test_9():
    url = 'http://127.0.0.1:8000/statistic/'
    response = requests.get(url)
    assert response.status_code == 403

def test_10():
    url = 'http://127.0.0.1:8000/statistic/graph/'
    response = requests.get(url)
    assert response.status_code == 403

def test_11():
    url = 'http://127.0.0.1:8000/statistic/tables/'
    response = requests.get(url)
    assert response.status_code == 403

def test_12():
    url = 'http://127.0.0.1:8000/statistic/stupid/'
    response = requests.get(url)
    assert response.status_code == 403

def test_13():
    url = 'http://127.0.0.1:8000/statistic/predict/1/'
    response = requests.get(url)
    assert response.status_code == 403

def test_with_authenticated_client(admin_client):
    response = admin_client.get('http://127.0.0.1:8000/statistic/')
    assert response.status_code == 200

def test_with_authenticated_client_1(admin_client):
    response = admin_client.get('http://127.0.0.1:8000/statistic/stupid/')
    assert response.status_code == 200

def test_with_authenticated_client_2(admin_client):
    response = admin_client.get('http://127.0.0.1:8000/statistic/graph/')
    assert response.status_code == 200

def test_with_authenticated_client_3(admin_client):
    response = admin_client.get('http://127.0.0.1:8000/statistic/tables/')
    assert response.status_code == 200
'''
def test_with_authenticated_client_4(admin_client):
    response = admin_client.get('http://127.0.0.1:8000/statistic/predict/1/')
    assert response.status_code == 200
'''







    

