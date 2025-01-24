from django.db import models
from django.contrib.auth.models import User



class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    name = models.CharField(max_length=100)
# Create your models here.


def __str__(self):
    return f"{self.name} on {self.date}"