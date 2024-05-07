import React, { useState } from "react";
import data from "../db.json";
import "./LoveSurvey.css";

import { Link } from "react-router-dom";

function LoveSurvey() {
    // states for the values we use in the survey
    const [page, setPage] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentAnswers, setCurrentAnswers] = useState(Array(10).fill(""));
    const [selectedOptions, setSelectedOptions] = useState(Array(10).fill(""));
    const [submitted, setSubmitted] = useState(false);
   // handle the option click 
    const handleOptionClick = (option, index) => {
        // update the selected options
        const updatedOptions = [...selectedOptions];
        updatedOptions[page * 3 + index] = option;
        setSelectedOptions(updatedOptions);
       // update the current answers
        const updatedAnswers = [...currentAnswers];
        updatedAnswers[page * 3 + index] = option;
        setCurrentAnswers(updatedAnswers);
    };
    // handle the input change
    const handleInputChange = (e, index) => {
        const updatedAnswers = [...currentAnswers];
        updatedAnswers[page * 3 + index] = e.target.value;
        setCurrentAnswers(updatedAnswers);
        setSelectedOptions(Array(10).fill(""));
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
                         className={selectedOptions[page * 3 + index] === option ? "selected" : ""}
                     >
                         {option}
                     </button>
                    ))
                ) : (
              // Render a text input for questions without predefined options

                    <input
                        type="text"
                        value={currentAnswers[page * 3 + index]}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                )}
            </div>
        ));
    };

    const goToNextPage = () => {
        // update the answers
        const updatedAnswers = { ...answers };
        currentAnswers.forEach((answer, index) => {
            updatedAnswers[page * 3 + index] = answer;
        });
        setAnswers(updatedAnswers);
        if (page < Math.ceil(data.questions.length / 3) - 1) {
            setPage(page + 1);
        }else{
            
            setSubmitted(true)//when all pages are complete
        }
        setCurrentAnswers(Array(10).fill(""));
        setSelectedOptions(Array(10).fill(""));
    };

    const goToPreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        
        <div id="LoveForm">
            {submitted ?(
            <div>
                <h2>Thank you for for completing the survey 😉!</h2>
                <Link to ="/food-display">
                <button>see Suggested foods</button>  
                </Link>              
            </div>
            ):(
            <div>
            {renderQuestions()}
            <div>
                
                <button onClick={goToPreviousPage} disabled={page === 0}>Back</button>
                <button onClick={goToNextPage}>Next</button>
            </div>
        </div>
            )}
        </div>
    );
}

export default LoveSurvey;
