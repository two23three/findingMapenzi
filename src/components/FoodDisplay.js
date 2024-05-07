import React, { useState, useEffect } from 'react';
import './FoodDisplay.css'; // Import CSS file for styling

function FoodDisplay() {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = '3c78c7ebf8cf4dbf88d442a2a8591e8a'; // 3c78c7ebf8cf4dbf88d442a2a8591e8a has 150 daily quota

  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data.recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <div className="food-container">
      <h1 className="food-heading">Random Foods with recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2 className="recipe-title">{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <p className="recipe-info">Ready in {recipe.readyInMinutes} minutes</p>
            <p className="recipe-info">Servings: {recipe.servings}</p>
            <ul className="recipe-ingredients">
              {recipe.extendedIngredients.map((ingredient, i) => (
                <li key={i}>{ingredient.original}</li>
              ))}
            </ul>
            <a href={recipe.sourceUrl} className="recipe-link">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;
