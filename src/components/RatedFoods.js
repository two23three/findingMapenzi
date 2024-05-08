// RatedFoods.js
import React from "react";

function RatedFoods({ ratings }) {
  return (
    <div className="rated-foods-container">
      <h1 className="rated-foods-title">Rated Foods</h1>
      <div className="rated-foods-list">
        {Object.entries(ratings).map(([recipeId, recipeData], index) => (
          <div key={index} className="rated-food-item">
            <h2>{recipeData.title}</h2>
            <img src={recipeData.image} alt={recipeData.title} />
            <p>Rating: {recipeData.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatedFoods;
