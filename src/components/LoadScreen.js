import React from "react";
import "./loadscreen.css";

function LoadScreen() {
    return (
        <div className="loading">
            <svg width="100px" height="100px">
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back" stroke="#000" strokeWidth="2"></polyline>
                <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front" stroke="#fff" strokeWidth="2"></polyline>
            </svg>
        </div>
    );
}

export default LoadScreen;
