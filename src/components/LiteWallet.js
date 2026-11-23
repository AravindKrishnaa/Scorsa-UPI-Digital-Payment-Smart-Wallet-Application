import React, { useState } from 'react';
import '../styles/LiteWallet.css';

function LiteWallet({ liteBalance, onAddToLite }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    onAddToLite(parsedAmount);
    setMessage(`₹${parsedAmount.toLocaleString('en-IN')} added to your SCORSA Lite wallet.`);
    setAmount('');
  };

  return (
    <div className="lite-wallet-page">
      <div className="lite-wallet-card">
        <div className="lite-wallet-header">
          <div className="lite-logo">💳</div>
          <div>
            <p className="lite-kicker">SCORSA Lite</p>
            <h2>Lite Wallet</h2>
          </div>
        </div>

        <div className="lite-balance-box">
          <span>Current Lite Balance</span>
          <strong>₹{Number(liteBalance).toLocaleString('en-IN')}</strong>
        </div>

        <form className="lite-form" onSubmit={handleSubmit}>
          <label htmlFor="liteAmount">Add amount to lite wallet</label>
          <div className="input-row">
            <span className="currency-symbol">₹</span>
            <input
              id="liteAmount"
              type="number"
              min="1"
              step="1"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button type="submit" className="lite-submit-btn">Add to Lite</button>
        </form>

        {message && <div className="lite-message">{message}</div>}
      </div>
    </div>
  );
}

export default LiteWallet;
