import React from 'react';
import '../styles/RewardsPage.css';

const rewardsByCategory = {
  cashback: [
    { title: 'Amazon Cashback', description: 'Flat ₹150 back on groceries', value: '₹150', amount: 150, tag: 'Food' },
    { title: 'Travel Rebate', description: '10% cashback on flights and hotels', value: '₹500', amount: 500, tag: 'Travel' },
    { title: 'Recharge Bonus', description: 'Extra ₹50 cashback on prepaid recharges', value: '₹50', amount: 50, tag: 'Bills' }
  ],
  offers: [
    { title: 'Weekend Deal', description: 'Enjoy 25% off on selected brands', value: '₹250', amount: 250, tag: 'Shopping' },
    { title: 'Movie Night', description: 'Buy 1 get 1 free on tickets', value: '₹180', amount: 180, tag: 'Entertainment' },
    { title: 'Restaurant Pass', description: 'Free dessert on dine-in orders', value: '₹120', amount: 120, tag: 'Dining' }
  ],
  vouchers: [
    { title: 'Fresh Basket', description: '₹500 grocery voucher', value: '₹500', amount: 500, tag: 'Groceries' },
    { title: 'Fuel Saver', description: '₹250 petrol voucher', value: '₹250', amount: 250, tag: 'Fuel' },
    { title: 'Fashion Alert', description: '₹750 apparel voucher', value: '₹750', amount: 750, tag: 'Fashion' }
  ],
  giftcards: [
    { title: 'Amazon Gift Card', description: 'Instant digital gift card', value: '₹1,000', amount: 1000, tag: 'Digital' },
    { title: 'Café Card', description: 'Use at Starbucks and Café Coffee Day', value: '₹750', amount: 750, tag: 'Food' },
    { title: 'Lifestyle Card', description: 'Redeem on partner stores', value: '₹2,000', amount: 2000, tag: 'Lifestyle' }
  ]
};

const tabs = [
  { id: 'cashback', label: 'Cashbacks' },
  { id: 'offers', label: 'Offers' },
  { id: 'vouchers', label: 'Vouchers' },
  { id: 'giftcards', label: 'Gift Cards' }
];

function RewardsPage({ activeTab, onTabChange, onBack, onClaimReward }) {
  const items = rewardsByCategory[activeTab] || rewardsByCategory.cashback;

  return (
    <div className="rewards-page">
      <div className="rewards-panel">
        <div className="rewards-header">
          <button type="button" className="rewards-back-btn" onClick={onBack}>← Back</button>
          <h2>Rewards</h2>
        </div>

        <div className="reward-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="reward-list">
          {items.map((item) => (
            <div key={item.title} className="reward-card">
              <div className="reward-topline">
                <span className="reward-tag">{item.tag}</span>
                <strong>{item.value}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" className="claim-btn" onClick={() => onClaimReward(item)}>
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
