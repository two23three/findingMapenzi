import React, { useState } from "react";
import data from "../db.json";

function LoveSurvey() {
   const [page, setPage] = useState(0); 
   const [answers, setAnswers] = useState({}); 
   const [currentAnswer, setCurrentAnswer] = useState("");  
 
   // Function to go to next question
   const goToNextQuestion = () => {
    // If current answer is not empty, store it in answers
     setAnswers({ ...answers, [page]: currentAnswer });
     setPage(page + 1);
     setCurrentAnswer(""); // Clear current answer if moving to next question
 }; 
   const handleInputChange = (e) => {
    // Update current answer
       setCurrentAnswer(e.target.value);
   }; 
   const renderQuestion = (question) => {
       return (
       <div key={question.id}>
        <h2>{question.text}</h2>
        {question.options ? (
            // Render options as buttons
            question.options.map((option) => (
                <button key={option} onClick={() => setCurrentAnswer(option)}>
                    {option}
                </button>
            ))
        ) : (
            // Render a text input for questions without predefined options
            <input
                type="text"
                value={currentAnswer}
                onChange={handleInputChange}
            />
        )}
        <button onClick={goToNextQuestion}>Next</button>
       </div>
     );
 };

    return (
     <div id="LoveForm">
         {page < data.questions.length ? (
             renderQuestion(data.questions[page])
         ) : (
             <div>
                 <h2>Thank you for completing the survey  😉!</h2>
                 
             </div>
         )}
     </div>
    );
}

export default LoveSurvey;
