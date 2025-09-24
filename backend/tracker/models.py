from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    total_calories = models.IntegerField(default=0)
    intake_calories = models.IntegerField(default=0)
    burnt_calories = models.IntegerField(default=0)
    date = models.DateField(default=timezone.now)

class Exercise(models.Model):
    CATEGORY_CHOICES = [
        ('arms', 'Arms'),
        ('chest', 'Chest'),
        ('shoulders', 'Shoulders'),
        ('back', 'Back'),
        ('abs', 'Abs'),
        ('legs', 'Legs'),
        ('hips', 'Hips'),
        ('glutes', 'Glutes'), 
        ('lower back', 'Lower Back'), 
        
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    calories = models.IntegerField()

    def __str__(self):
        return self.name

class Food(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    calories = models.IntegerField()

    def __str__(self):
        return self.name


def current_date():
    return timezone.now().date()

class UserFood(models.Model):
    user = models.ForeignKey(User, related_name='user_foods', on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    date = models.DateField(default=current_date)
    calories = models.IntegerField(default=0)
    quantity = models.IntegerField(default = 0)
    

    def save(self, *args, **kwargs):
        self.calories = self.food.calories
        self.quantity = self.food.quantity
        super(UserFood, self).save(*args, **kwargs)

class UserExercise(models.Model):
    user = models.ForeignKey(User, related_name='user_exercises', on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    date = models.DateField(default=current_date)
    calories = models.IntegerField(default = 0)

    def save(self, *args, **kwargs):
        self.calories = self.exercise.calories
        super(UserExercise, self).save(*args, **kwargs)

class Recipe(models.Model):
    CATEGORY_CHOICES = [
        ('high protein', 'High Protein'),
        ('low fat', 'Low Fat'),
        ('low carbs', 'Low Carbs'),
        ('gluten free', 'Gluten Free'),
        ('high fibre', 'High Fibre'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()

    def __str__(self):
        return self.name
