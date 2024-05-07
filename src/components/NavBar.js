import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
//imports for heart logo
//imports for love theme
//imports for light theme
function NavBar () {
    return (
        <div className="navbar">
            {/*heart logo */}
        <img src="" alt="" className="logo"/>
        <p className="note">Find Love with food</p>
            <ul>
                {/* links */}
                <li><Link to="/LoveSurvey"></Link>LoveForm</li>
                <li><Link to="/Profile"></Link>Profile</li>
                <li><Link to="/FoodDisplay"></Link>FoodForDate</li>
            </ul>
            <div className="searchbar">
                <input type="text" placeholder="Search for food" />
            </div>
            {/*themes*/}
            <img src="" alt="" className="toggle-icon"/>

        </div>
    )
}
export default NavBar;