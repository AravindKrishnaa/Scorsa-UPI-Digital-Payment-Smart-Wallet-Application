import React from 'react';
import '../styles/ProfilePage.css';

function ProfilePage({ userProfile, qrCodeUrl, onBack, onChangePin }) {
  const settingsItems = [
    'My QR',
    'Auto Pay',
    'Manage Bank Account',
    'Settings',
    'Change PIN'
  ];

  return (
    <div className="profile-page">
      <div className="profile-panel">
        <div className="profile-header">
          <button type="button" className="profile-back-btn" onClick={onBack}>← Back</button>
          <h2>Profile</h2>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">{userProfile.profilePicture || '👤'}</div>
          <div className="profile-overview">
            <h3>{userProfile.name || 'User Name'}</h3>
            <p>{userProfile.email || 'No email added'}</p>
          </div>
        </div>

        <div className="profile-details-grid">
          <div className="detail-box">
            <span>Name</span>
            <strong>{userProfile.name || 'Not provided'}</strong>
          </div>
          <div className="detail-box">
            <span>Phone Number</span>
            <strong>{userProfile.phoneNumber || 'Not provided'}</strong>
          </div>
          <div className="detail-box">
            <span>UPI ID</span>
            <strong>{userProfile.upiId || 'Not provided'}</strong>
          </div>
          <div className="detail-box">
            <span>Bank Account Number</span>
            <strong>{userProfile.bankAccountNumber || 'XXXX XXXX 2847'}</strong>
          </div>
        </div>

        <div className="qr-section">
          <div className="qr-info">
            <span className="qr-label">My QR</span>
            <p>Share this QR to receive payments instantly.</p>
          </div>
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="UPI QR code" className="profile-qr" />
          )}
        </div>

        <div className="settings-list">
          {settingsItems.map((item) => (
            <button
              type="button"
              key={item}
              className="setting-item"
              onClick={() => {
                if (item === 'Change PIN') {
                  onChangePin();
                }
              }}
            >
              <span>{item}</span>
              <strong>›</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
