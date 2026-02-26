from django.urls import path
from .views import test, city_score, register, user_login, get_csrf

urlpatterns = [
    path('register/', register),
    path('test/', test),
    path('cityscore/', city_score),
    path('login/', user_login),
    path('csrf/', get_csrf),
]