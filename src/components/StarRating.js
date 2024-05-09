import React, { useState, useEffect } from "react";
import "./StarRating.css";

function StarRating({ initialRating, onRating }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(initialRating); // Set the initial rating when the component mounts
  }, [initialRating]);

  const handleClick = (index) => {
    setRating(index);
    if (onRating) {
      onRating(index);
    }
  };

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((_, index) => {
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
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
