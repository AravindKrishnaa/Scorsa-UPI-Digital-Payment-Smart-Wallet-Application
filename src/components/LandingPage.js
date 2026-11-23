import React from 'react';
import '../styles/LandingPage.css';
import logo2 from '../logo2.png';

function LandingPage({ onGoToSignup, onGoToLogin }) {
  return (
    <div className="landing-page">
      <div className="landing-card">
        <img src={logo2} alt="SCORSA logo" className="landing-logo" />
        <p className="landing-kicker">SCORSA</p>
        <h1>Smart payments for everyday life</h1>
        <p className="landing-copy">
          Send money, receive payments, and manage your digital wallet in one secure place.
        </p>

        <div className="landing-actions">
          <button type="button" className="primary-action" onClick={onGoToSignup}>
            Sign Up
          </button>
          <button type="button" className="secondary-action" onClick={onGoToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
