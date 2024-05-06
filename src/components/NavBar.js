import React from "react";
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
                <li>LoveForm</li>
                <li>Profile</li>
                <li>FoodForDate</li>
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