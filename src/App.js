import React, { useState , useEffect} from "react";
import "./App.css";
import Profile from "./components/Profile";
import FoodDisplay from "./components/FoodDisplay";
import LoveSurvey from "./components/LoveSurvey";
import RatedFoods from "./components/RatedFoods";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext"; // Import ThemeProvider from ThemeContext file
import LoadScreen from "./components/LoadScreen";
function App() {
  const [ratings, setRatings] = useState({}); // Initialize state for ratings
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the delay time as needed

    return () => clearTimeout(timeout);
  }, []);
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {isLoading ? (
            <LoadScreen />
          ) : (
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
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
