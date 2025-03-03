from django.db import models
from django.contrib.auth.models import User

class ExerciseLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Each log belongs to a user
    date = models.DateField()  # The day the workout was recorded
    exercises = models.JSONField(default=list)  # List of exercises performed

    def __str__(self):
        return f"{self.user.username} - {self.date}"
