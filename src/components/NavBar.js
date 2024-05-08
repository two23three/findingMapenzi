import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery(""); // Clear the search input after search
  };

  return (
    <div className="navbar">
      <img src="" alt="" className="logo" />
      <p className="note">Find Love with food</p>
      <ul>
       <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/LoveSurvey">LoveForm</Link>
        </li>
       
        <li>
          <Link to="/food-display">FoodForDate</Link>
        </li>
        <li>
          <Link to="/rated-foods">Rated Foods</Link>
        </li>{" "}
      </ul>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search for food"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <img src="" alt="" className="toggle-icon" />
    </div>
  );
}

export default NavBar;
