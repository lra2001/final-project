from django.urls import path
from . import views

urlpatterns = [
    path('core/', views.api, name='test_core'),
]