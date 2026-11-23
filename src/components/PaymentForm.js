import React, { useState } from 'react';
import '../styles/PaymentForm.css';

function PaymentForm({ onSubmit, userUPI, balance }) {
  const [formData, setFormData] = useState({
    receiverName: '',
    recipientUPI: '',
    recipientPhone: '',
    amount: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    const hasUPI = formData.recipientUPI.trim();
    const hasPhone = formData.recipientPhone.trim();
    
    // Receiver name validation (optional but if provided should be valid)
    if (formData.receiverName && !/^[a-zA-Z\s]{2,}$/.test(formData.receiverName.trim())) {
      newErrors.receiverName = 'Name must contain only letters and be at least 2 characters';
    }
    
    // Either UPI ID or Phone number is required
    if (!hasUPI && !hasPhone) {
      newErrors.recipientUPI = 'Please enter either UPI ID or Phone number';
    }
    
    // If UPI ID is provided, validate format
    if (hasUPI && !formData.recipientUPI.includes('@')) {
      newErrors.recipientUPI = 'Invalid UPI ID format (must contain @)';
    }
    
    // If Phone is provided, validate format
    if (hasPhone && !/^\d{10}$/.test(formData.recipientPhone.replace(/\D/g, ''))) {
      newErrors.recipientPhone = 'Phone number must be 10 digits';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Please enter amount';
    } else if (isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    } else if (formData.amount > balance) {
      newErrors.amount = 'Insufficient balance';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    onSubmit(formData);
    setFormData({ receiverName: '', recipientUPI: '', recipientPhone: '', amount: '', description: '' });
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>Confirm Payment</h2>
          <div className="confirmation-details">
            <div className="detail-row">
              <span className="detail-label">From:</span>
              <span className="detail-value">{userUPI}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">To:</span>
              <span className="detail-value">
                {formData.recipientUPI || formData.recipientPhone}
              </span>
            </div>
            {formData.receiverName && (
              <div className="detail-row">
                <span className="detail-label">Receiver Name:</span>
                <span className="detail-value">{formData.receiverName}</span>
              </div>
            )}
            {formData.recipientUPI && formData.recipientPhone && (
              <div className="detail-row">
                <span className="detail-label">Alt Phone:</span>
                <span className="detail-value">{formData.recipientPhone}</span>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value amount">₹{formData.amount}</span>
            </div>
            {formData.description && (
              <div className="detail-row">
                <span className="detail-label">Note:</span>
                <span className="detail-value">{formData.description}</span>
              </div>
            )}
          </div>
          <div className="confirmation-buttons">
            <button className="confirm-btn" onClick={handleConfirm}>Confirm & Pay</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form-container">
      <div className="form-card">
        <h2>Send Money via UPI</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <p className="form-note">* Use either UPI ID or Phone Number</p>
          
          <div className="form-group">
            <label htmlFor="receiverName">Receiver Name (Optional)</label>
            <input
              type="text"
              id="receiverName"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleInputChange}
              placeholder="e.g., XXXXXXX"
              className={errors.receiverName ? 'error' : ''}
            />
            {errors.receiverName && (
              <span className="error-message">{errors.receiverName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="recipientUPI">Recipient UPI ID</label>
            <input
              type="text"
              id="recipientUPI"
              name="recipientUPI"
              value={formData.recipientUPI}
              onChange={handleInputChange}
              placeholder="e.g., recipient@upi"
              className={errors.recipientUPI ? 'error' : ''}
            />
            {errors.recipientUPI && (
              <span className="error-message">{errors.recipientUPI}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="recipientPhone">Recipient Phone Number</label>
            <input
              type="tel"
              id="recipientPhone"
              name="recipientPhone"
              value={formData.recipientPhone}
              onChange={handleInputChange}
              placeholder="e.g., 9841818679"
              className={errors.recipientPhone ? 'error' : ''}
            />
            {errors.recipientPhone && (
              <span className="error-message">{errors.recipientPhone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₹) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              className={errors.amount ? 'error' : ''}
              step="0.01"
              min="0"
            />
            {errors.amount && (
              <span className="error-message">{errors.amount}</span>
            )}
            <p className="balance-info">Available Balance: ₹{balance.toLocaleString('en-IN')}</p>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add a note for the transaction..."
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn">Proceed</button>
        </form>
      </div>

      <div className="tips-card">
        <h3>💡 Tips</h3>
        <ul>
          <li>Always verify the recipient's UPI ID before sending</li>
          <li>Use strong descriptions for easy tracking</li>
          <li>Transactions are instant</li>
          <li>Check your balance before sending</li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentForm;
