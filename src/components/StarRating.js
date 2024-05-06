import React, { useState } from "react";

function StarRating({ onRating }) {
  const [rating, setRating] = useState(0);

  function handleClick(index) {
    setRating(index);
    onRating(index);
  }

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(index)}
          ></button>
        );
      })}
    </div>
  );
}

export default StarRating;
