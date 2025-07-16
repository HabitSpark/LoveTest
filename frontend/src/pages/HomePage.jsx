// src/pages/HomePage.jsx
import React, { useState } from 'react';
import './../styles/HomePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loveAnimation from '../assets/love.json';

const HomePage = () => {
  const [yourName, setYourName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!yourName || !partnerName) return alert("Please enter both names");
    try {
      const res = await axios.post('https://lovetest-7954.onrender.com/api/love/test', {
        yourName,
        partnerName
      });
      navigate('/result', {
        state: {
          ...res.data,
          yourName,
          partnerName
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <div className="animation">
        <Lottie animationData={loveAnimation} loop={true} />
      </div>
      <div className="form-card">
        <h1 className="title">💖 Love Match Test 💖</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Your Name"
            value={yourName}
            onChange={(e) => setYourName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Partner's Name"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="input"
          />
          <button type="submit" className="submit-btn">
            💘 Test Love
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
