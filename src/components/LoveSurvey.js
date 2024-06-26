import React, { useState } from "react";
import data from "../db.json";
import "./LoveSurvey.css";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import useTheme hook
import { firestore } from "../components/firebase";
import { addDoc,collection, serverTimestamp } from "firebase/firestore";
import NavBar from "./NavBar";

function LoveSurvey() {
   
    // states for the values we use in the survey
    const [page, setPage] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const { theme } = useTheme(); // Access theme from the theme context
    const saveDataToFirebase = async () => {
        try {
            // Add timestamp to user data
            const timestamp = serverTimestamp();

            // Generate a unique identifier for each response
            const responseRef = await addDoc(collection(firestore, "surveyData"), {
                answers: answers,
                timestamp: timestamp
            });
            console.log("Data saved to Firebase successfully!", responseRef.id);
        } catch (error) {
            console.error("Error saving data to Firebase:", error);
        }
    };
    // handle the option click 
    const handleOptionClick = (option, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[page * 3 + index] = option;
        setAnswers(updatedAnswers);
    };

    // handle the input change
    const handleInputChange = (e, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[page * 3 + index] = e.target.value;
        setAnswers(updatedAnswers);
    };

    // render the questions
    const renderQuestions = () => {
        const startIndex = page * 3;
        const endIndex = Math.min(startIndex + 3, data.questions.length);

        return data.questions.slice(startIndex, endIndex).map((question, index) => (
            <div key={question.id}>
                <h2>{question.text}</h2>
                {question.options ? (
                    question.options.map((option) => (
                        // Render options as buttons
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option, index)}
                            className={answers[page * 3 + index] === option ? "selected" : ""}
                        >
                            {option}
                        </button>
                    ))
                ) : (
                    // Render a text input for questions without predefined options
                    <input
                        type="text"
                        value={answers[page * 3 + index] || ""}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                )}
            </div>
        ));
    };

    const goToNextPage = () => {
        if (page < Math.ceil(data.questions.length / 3) - 1) {
            setPage(page + 1);
        } else {
            saveDataToFirebase();
            setSubmitted(true);
        }
    };

    const goToPreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (<>
        <NavBar />
        <div className={`LoveForm ${theme}`}>
            {submitted ? (
                <div>
                    <h2>Thank you for completing the survey! 😊</h2>
                    <Link to="/food-display">
                        <button>See Suggested Foods</button>
                    </Link>
                </div>
            ) : (
                <div>
                    {renderQuestions()}
                    <div>
                        <button onClick={goToPreviousPage} disabled={page === 0}>Back</button>
                        <button onClick={goToNextPage}>Next</button>
                    </div>
                </div>
            )}
        </div></>
    );
}

export default LoveSurvey;
