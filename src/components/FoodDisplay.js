import React, { useState, useEffect } from "react";
import "./FoodDisplay.css";
import StarRating from "./StarRating";
import NavBar from "./NavBar";
// import { useTheme } from "../ThemeContext";

// State variables
function FoodDisplay({ setRatings }) {
  const [recipes, setRecipes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const { theme } = useTheme();
  const API_KEY = "59031b767a6f4514b3ae156bbe60f826"; //3c78c7ebf8cf4dbf88d442a2a8591e8a

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchRecipes(
        // Fetch recipes based on search query
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}&number=5`
      );
    } else {
      fetchRecipes(
        // Fetch 5 random recipes to display
        `https://api.spoonacular.com/recipes/random?number=5&apiKey=${API_KEY}`
      );
    }
  }, [searchQuery]);

  // Function to fetch recipes from the API
  const fetchRecipes = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.recipes || data.results);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  // Function to handle rating updates
  const handleRatingUpdate = (recipeId, rating) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (recipe) {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [recipeId]: { ...recipe, rating },
      }));
    }
  };

  // Function to handle search query changes
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to handle a recipe deletion
  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <div className={`food-container`}>
      <NavBar onSearch={handleSearch} />
      <h1 className="food-heading">Random Foods with recipes</h1>
      {/* Render recipes or loading message based on recipes state */}
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
              <p className="recipe-rating">
                Rating: {recipe.rating || "No rating yet"}
              </p>
              <button
                className="recipe-delete-button"
                onClick={() => handleDeleteRecipe(index)}
              >
                Delete
              </button>
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
