import React from "react";
import "./RatedFoods.css";
import StarRating from "./StarRating";
import NavBar from "./NavBar";
// This component is responsible for displaying foods that have been rated.
function RatedFoods({ ratings }) {
  // Filter to include only rated items
  const ratedEntries = Object.entries(ratings).filter(
    ([_, recipeData]) => recipeData.rating > 0
  );

  return (
    <div className="rated-foods-container">
      <NavBar />
      <h1 className="rated-foods-title">Rated Foods</h1>
      <div className="rated-foods-list">
        {ratedEntries.map(([recipeId, recipeData], index) => (
          <div key={index} className="rated-food-item">
            <h2>{recipeData.title}</h2>
            <img src={recipeData.image} alt={recipeData.title} />
            <StarRating initialRating={recipeData.rating} />
            <p>Rating: {recipeData.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatedFoods;
