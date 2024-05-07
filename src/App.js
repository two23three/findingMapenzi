import "./App.css";
import Profile from "./components/Profile";
import React from "react";
import FoodDisplay from "./components/FoodDisplay";
import StarRating from "./components/StarRating";
//imports navbar
import NavBar from "./components/NavBar"; // Import NavBar

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      {/*routes for navbar*/}
    <NavBar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/food-display" element={<FoodDisplay />} />
        <Route path="/star-rating" element={<StarRating />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
