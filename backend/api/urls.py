from django.urls import path
from .views import test, city_score, register

urlpatterns = [
    path('register/', register),
    path('test/', test),
    path('cityscore/', city_score)


]