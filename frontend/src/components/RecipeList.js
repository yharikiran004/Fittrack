// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const RecipeList = ({ category, onRecipeClick }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem('access');
        if (!token) {
          console.error('No access token found. Please log in.');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/?category=${category}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    };

    if (category) {
      fetchRecipes();
    }
  }, [category]);

  return (
    <div>
      <h2>Recipes for {category}</h2>
      <div className="stats-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
