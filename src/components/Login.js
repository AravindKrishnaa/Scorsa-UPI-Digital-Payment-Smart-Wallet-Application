import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLogin, existingProfile, onGoToSignup }) {
  const [formData, setFormData] = useState({
    email: existingProfile?.email || '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    onLogin({
      email: formData.email,
      password: formData.password
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-visual">
          <div className="auth-badge">Welcome back</div>
          <h1>Login to your account</h1>
          <p>Secure access to your wallet, transfers, and payment history.</p>
          <div className="auth-visual-card">
            <span>🔐</span>
            <strong>Fast and secure</strong>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Login</h2>
            <p>Enter your details below</p>
          </div>

          {error && <div className="form-error">{error}</div>}

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

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit-btn">Login</button>

          <div className="auth-footer">
            Don&apos;t have an account? <span onClick={onGoToSignup}>Create one</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
