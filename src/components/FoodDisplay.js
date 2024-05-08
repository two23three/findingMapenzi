import React, { useState, useEffect } from "react";
import "./FoodDisplay.css";
import StarRating from "./StarRating";
import NavBar from "./NavBar";

function FoodDisplay({ setRatings }) {
  const [recipes, setRecipes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = "";//3c78c7ebf8cf4dbf88d442a2a8591e8a

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchRecipes(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}&number=5`
      );
    } else {
      fetchRecipes(
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
      );
    }
  }, [searchQuery]);

  const fetchRecipes = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.recipes || data.results);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  };

  const handleRatingUpdate = (recipeId, rating) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [recipeId]: { ...recipe, rating },
      }));
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <div className="food-container">
      <NavBar onSearch={handleSearch} />
      <h1 className="food-heading">Random Foods with recipes</h1>
      {recipes !== null ? (
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <h2 className="recipe-title">{recipe.title}</h2>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              {recipe.readyInMinutes && (
                <p className="recipe-info">
                  Ready in {recipe.readyInMinutes} minutes
                </p>
              )}
              {recipe.servings && (
                <p className="recipe-info">Servings: {recipe.servings}</p>
              )}
              {recipe.extendedIngredients && (
                <ul className="recipe-ingredients">
                  {recipe.extendedIngredients.map((ingredient, i) => (
                    <li key={i}>{ingredient.original}</li>
                  ))}
                </ul>
              )}
              <a href={recipe.sourceUrl} className="recipe-link">
                View Recipe
              </a>
              <StarRating
                onRating={(rating) => handleRatingUpdate(recipe.id, rating)}
              />
              <p>Rating: {recipe.rating || "No rating yet"}</p>
              <button onClick={() => handleDeleteRecipe(index)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FoodDisplay;
