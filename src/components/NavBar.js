import React from "react";
import "./NavBar.css"
//imports for heart logo
//imports for love theme
function NavBar () {
    return (
        <div className="navbar">
            //heart logo
        <img src="" alt="" className="logo"></img>
            <ul>
                <li>LoveForm</li>
                <li>Profile</li>
                <li>FoodForDate</li>
            </ul>
            <div className="searchbar">
                <input type="text" placeholder="Search for food">

                </input>

            </div>
        </div>
    )
}