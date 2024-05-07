import "./App.css";
import Profile from "./components/Profile";
import React from "react";
import LoveSurvey from "./components/LoveSurvey";
import FoodDisplay from "./components/FoodDisplay";
function App() {
  return (
    <div className="App">
      <Profile />
      <LoveSurvey />
      <FoodDisplay />
    </div>
  );
}

export default App;
