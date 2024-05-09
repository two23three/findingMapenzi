import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import useTheme hook
import "./NavBar.css";

function NavBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggleTheme } = useTheme(); // Access theme and toggleTheme function

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery(""); // Clear the search input after search
  };

  return (
    <div className={`navbar ${theme}`}>
      <nav>
      <img src="" alt="" className="logo" />
      <p className="note">Find Love with food</p>
      <ul className="menu">
        <li>
          <Link className="navbutton" to="/">Profile</Link>
        </li>
        <li>
          <Link className="navbutton" to="/LoveSurvey">LoveForm</Link>
        </li>
        <li>
          <Link className="navbutton" to="/food-display">FoodForDate</Link>
        </li>
        <li>
          <Link className="navbutton" to="/rated-foods">Rated Foods</Link>
        </li>{" "}
      </ul>
      <div className="search">
        <form>
        <input
          type="text"
          placeholder="Search for food"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type= "submit" className="button" onClick={handleSearch} placeholder= "search">GO</button>
        <button className="toggle-button" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
       </button>
       </form>
      </div>
     </nav>
    </div>
  );
}

export default NavBar;
