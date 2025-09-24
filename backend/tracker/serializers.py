from rest_framework import serializers
from .models import User, Exercise, Food, UserFood, UserExercise,Recipe

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'total_calories', 'intake_calories', 'burnt_calories']

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'name', 'category', 'calories']

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'quantity', 'calories']

class UserFoodSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    food = FoodSerializer(read_only=True)  # Use FoodSerializer for read operations
    food_id = serializers.PrimaryKeyRelatedField(queryset=Food.objects.all(), write_only=True)  # Use food_id for write operations

    class Meta:
        model = UserFood
        fields = ['id', 'user', 'food', 'food_id', 'calories', 'date']

    def create(self, validated_data):
        validated_data['food'] = validated_data.pop('food_id')
        return super().create(validated_data)

class UserExerciseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    exercise = ExerciseSerializer(read_only=True)  # Use FoodSerializer for read operations
    exercise_id = serializers.PrimaryKeyRelatedField(queryset=Exercise.objects.all(), write_only=True)  # Use food_id for write operations


    class Meta:
        model = UserExercise
        fields = ['id', 'user', 'exercise','exercise_id', 'calories', 'date']

    def create(self, validated_data):
        validated_data['exercise'] = validated_data.pop('exercise_id')
        return super().create(validated_data)
    
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'category', 'description']


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()
