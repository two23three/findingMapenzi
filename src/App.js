import React, { useState } from "react";
import "./App.css";
import Profile from "./components/Profile";
import FoodDisplay from "./components/FoodDisplay";
import LoveSurvey from "./components/LoveSurvey";
import RatedFoods from "./components/RatedFoods";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [ratings, setRatings] = useState({}); // Stores complete recipe data along with ratings

  return (
    <Router>
      <div className="App" id="light">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route
            path="/food-display"
            element={<FoodDisplay setRatings={setRatings} />}
          />
          <Route path="/lovesurvey" element={<LoveSurvey />} />
          <Route
            path="/rated-foods"
            element={<RatedFoods ratings={ratings} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
