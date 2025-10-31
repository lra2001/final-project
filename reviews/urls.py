from django.urls import path
from . import views

urlpatterns = [
    path('reviews/', views.reviews, name='test_reviews'),
]