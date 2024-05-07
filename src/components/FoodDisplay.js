import React, { useState, useEffect } from "react";
import "./FoodDisplay.css";
import StarRating from "./StarRating";
import NavBar from "./NavBar";

function FoodDisplay() {
  const [recipes, setRecipes] = useState(null); // Changed initial state to null
  const [ratings, setRatings] = useState({}); // State to store individual recipe ratings
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = "3c78c7ebf8cf4dbf88d442a2a8591e8a";

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchRecipes(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}&number=5`);
    } else {
      fetchRecipes(`https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`);
    }
  }, [searchQuery]);

  const fetchRecipes = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.recipes || data.results); // Update this line
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  // Function to handle rating updates
  const handleRatingUpdate = (recipeId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [recipeId]: rating,
    }));
  }; 
  
  const handleSearch = (query) => {
    setSearchQuery(query);
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
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              {recipe.readyInMinutes && (
                <p className="recipe-info">Ready in {recipe.readyInMinutes} minutes</p>
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
              <a href={recipe.sourceUrl} className="recipe-link">View Recipe</a>
              <StarRating onRating={(rating) => handleRatingUpdate(recipe.id, rating)} />
              <p>Rating: {ratings[recipe.id] || "No rating yet"}</p>
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
