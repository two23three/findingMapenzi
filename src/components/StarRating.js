import React, { useState, useEffect } from "react";
import "./StarRating.css";

function StarRating({ initialRating, onRating }) {
  const [rating, setRating] = useState(0);
  // Effect hook to update the rating state when the initialRating prop changes.
  useEffect(() => {
    setRating(initialRating); // Set the initial rating when the component mounts
  }, [initialRating]);
  // Effect hook to update the rating state when the initialRating prop changes.
  const handleClick = (index) => {
    setRating(index);
    if (onRating) {
      onRating(index);
    }
  };
  // Render the star rating component.
  return (
    <div className="star-rating-container">
      {[...Array(5)].map((_, index) => {
        // Iterate over an array of 5 elements to create five star buttons
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className="star-button"
            onClick={() => handleClick(index)}
          >
            <span className={index <= rating ? "star selected" : "star"}>
              &#9733;
              {/* Unicode character for a star, displayed inside the button */}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
