import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
//imports for heart logo
//imports for love theme
//imports for light theme
function NavBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
  
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(searchQuery);
      setSearchQuery(""); // Clear the search input after search
    };
//styles
    return (
        <div className="navbar">
            {/*heart logo */}
        <img src="" alt="" className="logo"/>
        <p className="note">Find Love with food</p>
            <ul>
                {/* links */}
                <li><Link to="/LoveSurvey">LoveForm</Link></li>
                <li><Link to="/">Profile</Link></li>
                <li><Link to="/food-display">FoodForDate</Link></li>
            </ul>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search for food"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button  className="button" onClick={handleSearch}>Search</button>
            </div>
            {/*themes*/}
            <img src="" alt="" className="toggle-icon"/>

        </div>
    )
}
export default NavBar;