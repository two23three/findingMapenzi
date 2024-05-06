import React, { useState, useEffect } from 'react';

function FoodDisplay() {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = 'YOUR_API_KEY_HERE'; // Replace 'YOUR_API_KEY_HERE' with your actual Spoonacular API key

  useEffect(function() {
    fetch(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(function(data) {
        setRecipes(data.recipes);
      })
      .catch(function(error) {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Random Recipes</h1>
      {recipes.map(function(recipe, index) {
        return (
          <div key={index}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <p>Ready in {recipe.readyInMinutes} minutes</p>
            <p>Servings: {recipe.servings}</p>
            <ul>
              {recipe.extendedIngredients.map(function(ingredient, i) {
                return <li key={i}>{ingredient.original}</li>;
              })}
            </ul>
            <a href={recipe.sourceUrl}>View Recipe</a>
          </div>
        );
      })}
    </div>
  );
}

export default FoodDisplay;
