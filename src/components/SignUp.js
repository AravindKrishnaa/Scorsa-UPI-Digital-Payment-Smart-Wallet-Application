import React, { useState } from 'react';
import '../styles/SignUp.css';

function SignUp({ onSignup, existingProfile, onGoToLogin }) {
  const [formData, setFormData] = useState({
    fullName: existingProfile?.name || '',
    email: existingProfile?.email || '',
    phoneNumber: existingProfile?.phoneNumber || '',
    upiId: existingProfile?.upiId || '',
    bankAccountNumber: existingProfile?.bankAccountNumber || 'XXXX XXXX 2847',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, upiId, bankAccountNumber, password, confirmPassword } = formData;

    if (!fullName || !email || !phoneNumber || !upiId || !password || !confirmPassword) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    onSignup({
      name: fullName,
      email,
      phoneNumber,
      upiId,
      bankAccountNumber: bankAccountNumber || 'XXXX XXXX 2847',
      profilePicture: existingProfile?.profilePicture || '👤'
    });
  };

  return (
    <div className="signup-page">
      <div className="signup-shell">
        <div className="signup-visual">
          <div className="signup-badge">Welcome</div>
          <h1>Create your account</h1>
          <p>
            Join SCORSA and start sending, receiving, and managing UPI payments in seconds.
          </p>
          <ul>
            <li>Fast and secure UPI setup</li>
            <li>Track transfers in real time</li>
            <li>Manage your wallet with confidence</li>
          </ul>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Sign Up</h2>
            <p>Enter your details below</p>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="upiId">UPI ID</label>
              <input
                id="upiId"
                name="upiId"
                type="text"
                placeholder="yourname@upi"
                value={formData.upiId}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="bankAccountNumber">Bank account number</label>
              <input
                id="bankAccountNumber"
                name="bankAccountNumber"
                type="text"
                placeholder="XXXX XXXX 2847"
                value={formData.bankAccountNumber}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="signup-submit-btn">Create Account</button>

          <div className="signup-footer">
            Already have an account? <span onClick={onGoToLogin}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
