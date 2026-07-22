from django.urls import path
from . import views

urlpatterns = [
    # Change views.indexpage to views.index_page here:
    path('', views.index_page, name='indexpage'),
    
   
    path('login/', views.login_page, name='loginpage'),
    path('cart/', views.cart_page, name='cart_view'),
    path('register/', views.registerpage, name='registerpage'),
]