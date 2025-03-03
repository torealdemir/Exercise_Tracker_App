from django.contrib import admin
from .models import ExerciseLog


@admin.register(ExerciseLog)
class ExerciseLogAdmin(admin.ModelAdmin):
    list_display = ("user", "date", "exercise_count")  # Columns in the admin list view
    search_fields = ("user__username", "date")  # Allows searching by user and date
    list_filter = ("date", "user")  # Adds filtering by date and user
    ordering = ("-date",)  # Orders logs by most recent first

    def exercise_count(self, obj):
        return len(obj.exercises)  # Shows the number of exercises in each log
    exercise_count.short_description = "Exercises Count"  # Label for admin panel


# Register your models here.
