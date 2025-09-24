// src/components/RecipePage.js
import React, { useState } from 'react';
import RecipeList from './RecipeList';
import Navbar from './Navbar';

const categories = [
  'high protein', 'low fat', 'low carbs', 'gluten free', 'high fibre',
];

const RecipePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h2>Recipes</h2>
        {selectedRecipe ? (
          <div>
            <h3>{selectedRecipe.name}</h3>
            <p>{selectedRecipe.description}</p>
            <button onClick={() => setSelectedRecipe(null)}>Back to List</button>
          </div>
        ) : (
          <div>
            <div className="stats-container">
              {categories.map((category) => (
                <div className="stat-card" key={category} onClick={() => handleCategoryClick(category)}>
                  <h3>{category}</h3>
                </div>
              ))}
            </div>
            {selectedCategory && (
              <RecipeList category={selectedCategory} onRecipeClick={handleRecipeClick} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
