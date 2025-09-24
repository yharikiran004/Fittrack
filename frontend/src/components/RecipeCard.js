// src/components/RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe, onClick }) => (
  <div className="stat-card" onClick={() => onClick(recipe)}>
    <h3>{recipe.name}</h3>
    <p>Category: {recipe.category}</p>
  </div>
);

export default RecipeCard;
