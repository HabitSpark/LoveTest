// src/pages/ResultPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './../styles/HomePage.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { percentage = 0, message = "You're made for each other!" } = state || {};

  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setCurrentPercent(count);
      if (count >= percentage) clearInterval(timer);
    }, 20);
  }, [percentage]);

  const rotateDeg = (currentPercent / 100) * 180; // semi-circle gauge

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">💘 Love Speedometer 💘</h1>

        <div className="gauge">
          <div className="needle" style={{ transform: `rotate(${rotateDeg}deg)` }}></div>
          <div className="center-circle"></div>
          <p className="percent-label">{currentPercent}%</p>
        </div>

        <p className="message">{message}</p>
        <button onClick={() => navigate('/')} className="home-btn">Try Again</button>
      </div>
    </div>
  );
};

export default ResultPage;
