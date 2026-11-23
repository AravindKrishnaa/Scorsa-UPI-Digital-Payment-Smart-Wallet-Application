import React, { useMemo, useState } from 'react';
import '../styles/GoldInvestment.css';

const voucherOptions = [
  { id: 1, title: 'Gold Starter Voucher', value: '₹2,000', badge: 'Popular' },
  { id: 2, title: 'Gold Growth Voucher', value: '₹5,000', badge: 'Best value' },
  { id: 3, title: 'Gold Plus Voucher', value: '₹10,000', badge: 'Premium' },
  { id: 4, title: 'Gold Elite Voucher', value: '₹25,000', badge: 'VIP' }
];

function GoldInvestment({ type, goldPrice = 6580, goldBalance = 0, goldHistory = [], onBack, onSubmit }) {
  const [amount, setAmount] = useState('');

  const computedGrams = useMemo(() => {
    const value = Number(amount || 0);
    return value > 0 ? value / goldPrice : 0;
  }, [amount, goldPrice]);

  const computedAmount = useMemo(() => {
    const value = Number(amount || 0);
    return value > 0 ? value * goldPrice : 0;
  }, [amount, goldPrice]);

  const handleAction = () => {
    if (type === 'buy' && onSubmit) {
      onSubmit(amount);
      return;
    }

    if (type === 'sell' && onSubmit) {
      onSubmit(amount);
    }
  };

  const getTitle = () => {
    if (type === 'buy') return 'Buy Gold';
    if (type === 'sell') return 'Sell Gold';
    if (type === 'vault') return 'Gold Vault';
    return 'Gold Redeem Vouchers';
  };

  const isBuy = type === 'buy';
  const isSell = type === 'sell';

  return (
    <div className="gold-page">
      <div className="gold-panel">
        <div className="gold-header">
          <button type="button" className="gold-back-btn" onClick={onBack}>← Back</button>
          <h2>{getTitle()}</h2>
        </div>

        {type === 'buy' && (
          <div className="gold-form-card">
            <div className="gold-rate-box">
              <span>Today’s gold rate</span>
              <strong>₹{Number(goldPrice).toLocaleString('en-IN')} / gram</strong>
            </div>

            <label className="gold-label">Enter amount in INR</label>
            <input
              type="number"
              min="0"
              step="100"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="gold-output-box">
              <span>Gold you will receive</span>
              <strong>{computedGrams.toFixed(3)} g</strong>
            </div>

            <button type="button" className="gold-action-btn" onClick={handleAction}>
              Buy Gold
            </button>
          </div>
        )}

        {type === 'sell' && (
          <div className="gold-form-card">
            <div className="gold-rate-box">
              <span>Today’s gold rate</span>
              <strong>₹{Number(goldPrice).toLocaleString('en-IN')} / gram</strong>
            </div>

            <label className="gold-label">Enter grams to sell</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 2.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <div className="gold-output-box">
              <span>Estimated value</span>
              <strong>₹{computedAmount.toLocaleString('en-IN')}</strong>
            </div>

            <button type="button" className="gold-action-btn sell-btn" onClick={handleAction}>
              Sell Gold
            </button>
          </div>
        )}

        {type === 'vault' && (
          <div className="gold-vault-card">
            <div className="vault-balance-box">
              <span>Total Gold in Vault</span>
              <strong>{Number(goldBalance).toFixed(3)} g</strong>
            </div>

            <div className="vault-summary-row">
              <div className="vault-summary-box">
                <span>Live rate</span>
                <strong>₹{Number(goldPrice).toLocaleString('en-IN')}/g</strong>
              </div>
              <div className="vault-summary-box">
                <span>Value</span>
                <strong>₹{(goldBalance * goldPrice).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="vault-history">
              <h3>Gold History</h3>
              {goldHistory.length === 0 ? (
                <p className="empty-history">No gold transactions yet.</p>
              ) : (
                goldHistory.map((item) => (
                  <div key={item.id} className="history-row">
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.date}</span>
                    </div>
                    <div className="history-meta">
                      <span>{item.grams ? `${Number(item.grams).toFixed(3)} g` : '—'}</span>
                      <em>₹{Number(item.amount).toLocaleString('en-IN')}</em>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {type === 'redeem' && (
          <div className="voucher-grid">
            {voucherOptions.map((option) => (
              <div key={option.id} className="voucher-card">
                <span className="voucher-badge">{option.badge}</span>
                <h3>{option.title}</h3>
                <strong>{option.value}</strong>
                <button type="button" className="voucher-btn">Redeem</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GoldInvestment;
