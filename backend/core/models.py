from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game_name = models.CharField(max_length=200)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.game_name} - {self.user.username}"