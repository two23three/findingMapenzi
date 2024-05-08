// RatedFoods.js
import React from "react";

function RatedFoods({ ratedFoods }) {
  return (
    <div className="rated-foods-container">
      <h1 className="rated-foods-title">Rated Foods</h1>
      <div className="rated-foods-list">
        {ratedFoods.map((food, index) => (
          <div key={index} className="rated-food-item">
            <h2>{food.title}</h2>
            <p>Rating: {food.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatedFoods;
