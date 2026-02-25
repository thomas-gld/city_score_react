from django.urls import path
from .views import test, city_score

urlpatterns = [
    path('test/', test),
    path('cityscore/', city_score)


]