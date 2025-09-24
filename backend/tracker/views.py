from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import User, Exercise, Food, UserFood, UserExercise, Recipe
from .serializers import UserSerializer, ExerciseSerializer, FoodSerializer, UserFoodSerializer, UserExerciseSerializer, RecipeSerializer
from rest_framework import status
from transformers import FlaxAutoModelForSeq2SeqLM, AutoTokenizer
from .serializers import MessageSerializer

MODEL_NAME_OR_PATH = "flax-community/t5-recipe-generation"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_OR_PATH, use_fast=True)
model1 = FlaxAutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME_OR_PATH)

prefix = "items: "
generation_kwargs = {
    "max_length": 512,
    "min_length": 64,
    "no_repeat_ngram_size": 3,
    "do_sample": True,
    "top_k": 60,
    "top_p": 0.95
}

special_tokens = tokenizer.all_special_tokens
tokens_map = {
    "<sep>": "--",
    "<section>": "\n"
}

def skip_special_tokens(text, special_tokens):
    for token in special_tokens:
        text = text.replace(token, "")
    return text

def target_postprocessing(texts, special_tokens):
    if not isinstance(texts, list):
        texts = [texts]
    new_texts = []
    for text in texts:
        text = skip_special_tokens(text, special_tokens)
        for k, v in tokens_map.items():
            text = text.replace(k, v)
        new_texts.append(text)
    return new_texts

def generation_function(texts):
    _inputs = texts if isinstance(texts, list) else [texts]
    inputs = [prefix + inp for inp in _inputs]
    inputs = tokenizer(inputs, max_length=256, padding="max_length", truncation=True, return_tensors="jax")
    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    output_ids = model1.generate(input_ids=input_ids, attention_mask=attention_mask, **generation_kwargs)
    generated = output_ids.sequences
    generated_recipe = target_postprocessing(tokenizer.batch_decode(generated, skip_special_tokens=False), special_tokens)
    return generated_recipe

class ChatbotView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data['message']
            response = generation_function(message)
            return Response({'response': response}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserFoodViewSet(viewsets.ModelViewSet):
    queryset = UserFood.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        today = timezone.now().date()
        return UserFood.objects.filter(user=user, date=today)

    def perform_create(self, serializer):
        user = self.request.user
        user_food = serializer.save(user=user)
        user.intake_calories += user_food.calories
        user.save()

    def get_serializer_class(self):
        return UserFoodSerializer

class UserExerciseViewSet(viewsets.ModelViewSet):
    queryset = UserExercise.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        today = timezone.now().date()
        return UserExercise.objects.filter(user=user, date=today)

    def perform_create(self, serializer):
        user = self.request.user
        user_exercise = serializer.save(user=user)
        user.burnt_calories += user_exercise.calories
        user.save()

    def get_serializer_class(self):
        return UserExerciseSerializer

# views.py

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset

