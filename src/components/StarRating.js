import React, { useState } from "react";
import "./StarRating.css";

function StarRating({ onRating }) {
  // onRating is a callback function passed as a prop
  const [rating, setRating] = useState(0);

  function handleClick(index) {
    setRating(index);
    onRating(index);
  }

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        // Map over an array of 5 elements to create the stars
        index += 1; // Adjust the index to start from 1 instead of 0
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "star-button selected" : "star-button"} // Apply 'selected' class if the star is part of the current rating
            onClick={() => handleClick(index)}
          >
            <span className="star">&#9733;</span> {/* Star icon */}
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
