from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ExerciseViewSet, FoodViewSet, UserFoodViewSet, UserExerciseViewSet,RecipeViewSet,ChatbotView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'exercises', ExerciseViewSet)
router.register(r'foods', FoodViewSet)
router.register(r'userfoods', UserFoodViewSet)
router.register(r'userexercises', UserExerciseViewSet)
router.register(r'recipes', RecipeViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('chat/', ChatbotView.as_view(), name='chatbot'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]
