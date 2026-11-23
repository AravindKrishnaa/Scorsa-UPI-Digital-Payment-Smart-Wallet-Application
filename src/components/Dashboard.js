import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({
  balance,
  userProfile,
  onReceiveClick,
  onOpenLite,
  onRequestClick,
  onBuyGold,
  onSellGold,
  onViewVault,
  onRedeemGold,
  onOpenCashback,
  onOpenVouchers
}) {
  return (
    <div className="dashboard-container">
      <div className="balance-card">
        <div className="balance-header">
          <span className="balance-label-pill">Primary wallet</span>
          <span className="status-dot">● Active</span>
        </div>
        <h2>Account Balance</h2>
        <div className="balance-amount">₹{balance.toLocaleString('en-IN')}</div>
        <p className="balance-label">Available Balance</p>

      </div>

      <div className="quick-actions">
        <button className="action-btn send-btn" onClick={onReceiveClick}>
          <span className="btn-icon">📤</span>
          <span className="btn-label">Send</span>
        </button>
        <button className="action-btn receive-btn">
          <span className="btn-icon">📥</span>
          <span className="btn-label">Receive</span>
        </button>
        <button className="action-btn request-btn" onClick={onRequestClick}>
          <span className="btn-icon">🔔</span>
          <span className="btn-label">Request</span>
        </button>
        <button className="action-btn lite-btn" onClick={onOpenLite}>
          <span className="btn-icon">💳</span>
          <span className="btn-label">Lite</span>
        </button>
        <button className="action-btn cashback-btn" onClick={onOpenCashback}>
          <span className="btn-icon">💸</span>
          <span className="btn-label">Cashback</span>
        </button>
        <button className="action-btn voucher-btn" onClick={onOpenVouchers}>
          <span className="btn-icon">🎟️</span>
          <span className="btn-label">Vouchers</span>
        </button>
      </div>

      <div className="gold-savings-block">
        <div className="gold-savings-header">
          <span>Gold Savings</span>
          <button type="button" className="gold-savings-action">Add</button>
        </div>
        <div className="gold-savings-grid">
          <button className="gold-button gold-button-one" onClick={onBuyGold}>
            <span className="gold-icon">🥇</span>
            <span>Buy Gold</span>
          </button>
          <button className="gold-button gold-button-two" onClick={onSellGold}>
            <span className="gold-icon">📈</span>
            <span>Sell Gold</span>
          </button>
          <button className="gold-button gold-button-three" onClick={onViewVault}>
            <span className="gold-icon">🪙</span>
            <span>View Vault</span>
          </button>
          <button className="gold-button gold-button-four" onClick={onRedeemGold}>
            <span className="gold-icon">💰</span>
            <span>Redeem</span>
          </button>
        </div>
      </div>

      <div className="silver-savings-block">
        <div className="gold-savings-header">
          <span>Silver Savings</span>
          <button type="button" className="gold-savings-action">Add</button>
        </div>
        <div className="gold-savings-grid">
          <button className="silver-button silver-button-one">
            <span className="gold-icon">🥈</span>
            <span>Buy Silver</span>
          </button>
          <button className="silver-button silver-button-two">
            <span className="gold-icon">📉</span>
            <span>Sell Silver</span>
          </button>
          <button className="silver-button silver-button-three">
            <span className="gold-icon">🪙</span>
            <span>Vault</span>
          </button>
          <button className="silver-button silver-button-four">
            <span className="gold-icon">💸</span>
            <span>Redeem</span>
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h3>Profile Information</h3>
        <div className="profile-info">
          <div className="info-item">
            <label>Name</label>
            <p>{userProfile.name}</p>
          </div>
          <div className="info-item">
            <label>UPI ID</label>
            <p>{userProfile.upiId}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{userProfile.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
