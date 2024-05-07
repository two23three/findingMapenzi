import React, { useState } from "react";
import "./StarRating.css";

function StarRating({ onRating }) {
  const [rating, setRating] = useState(0);

  function handleClick(index) {
    setRating(index);
    onRating(index);
  }

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => handleClick(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
