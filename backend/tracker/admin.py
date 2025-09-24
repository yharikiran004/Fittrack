from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User, Exercise, Food, UserFood, UserExercise, Recipe

# User Admin
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'total_calories', 'intake_calories', 'burnt_calories', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email',)}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'is_active')}),
        ('Calories', {'fields': ('total_calories', 'intake_calories', 'burnt_calories')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)
    filter_horizontal = ()

# Exercise Admin
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'calories')
    list_filter = ('category',)
    search_fields = ('name', 'category')

# Food Admin
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'calories')
    search_fields = ('name',)

# UserFood Admin
class UserFoodAdmin(admin.ModelAdmin):
    list_display = ('user', 'food', 'calories','quantity', 'date')
    list_filter = ('date', 'user', 'food')
    search_fields = ('user__username', 'food__name')

# UserExercise Admin
class UserExerciseAdmin(admin.ModelAdmin):
    list_display = ('user', 'exercise', 'calories', 'date')
    list_filter = ('date', 'user', 'exercise')
    search_fields = ('user__username', 'exercise__name')

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name', 'category')

# Register models
admin.site.register(User, UserAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(UserFood, UserFoodAdmin)
admin.site.register(UserExercise, UserExerciseAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.unregister(Group)
