import "./App.css";
import Profile from "./components/Profile";
import React from "react";
import FoodDisplay from "./components/FoodDisplay";
import StarRating from "./components/StarRating";
import LoveSurvey from "./components/LoveSurvey";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
     <NavBar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/food-display" component={FoodDisplay} />
        <Route path="/lovesurvey" element={<LoveSurvey />} />
        <Route path="/star-rating" element={<StarRating />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
