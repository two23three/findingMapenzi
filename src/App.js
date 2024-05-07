import "./App.css";
import Profile from "./components/Profile";
import React from "react";
import FoodDisplay from "./components/FoodDisplay";
<<<<<<< HEAD
=======
import StarRating from "./components/StarRating";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> cc1ed2f (made a few routes)

function App() {
  return (
    <Router>
    <div className="App">
<<<<<<< HEAD
      <Profile />
      <LoveSurvey />
      <FoodDisplay />
=======
      <Routes>
        <Route path="/" element={<Profile />} />
        
        <Route path="/food-display" element={<FoodDisplay />} />
        <Route path="/star-rating" element={<StarRating />} />
      </Routes>
>>>>>>> cc1ed2f (made a few routes)
    </div>
  </Router>
  );
}

export default App;
