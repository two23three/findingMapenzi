import React, { useState } from "react";

function StarRating({ onRating }) {
  const [rating, setRating] = useState(0); // State to keep track of the current rating

  function handleClick(index) {
    setRating(index);
    onRating(index);
  }

  // Render a list of buttons for the star ratings
  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        // Map over an array of 5 elements to create a star rating interface
        index += 1; // Adjust index to start on 1
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index)}
            className={`star-button ${index <= rating ? "selected" : ""}`}
            id={`star-${index}`}
          ></button>
        );
      })}
    </div>
  );
}

// Export the StarRating component as the default export
export default StarRating;
