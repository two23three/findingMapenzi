import React from "react";
import "./App.css";
import Profile from "./components/Profile";
import FoodDisplay from "./components/FoodDisplay";
import LoveSurvey from "./components/LoveSurvey";
import RatedFoods from "./components/RatedFoods";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider from ThemeContext file

function App() {
  return (
    <ThemeProvider> 
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route
              path="/food-display"
              element={<FoodDisplay />}
            />
            <Route path="/lovesurvey" element={<LoveSurvey />} />
            <Route
              path="/rated-foods"
              element={<RatedFoods />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider> 
  );
}

export default App;
