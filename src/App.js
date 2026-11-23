import React, { useState, useEffect } from 'react';
import './App.css';
import logo2 from './logo2.png';
import Dashboard from './components/Dashboard';
import PaymentForm from './components/PaymentForm';
import TransactionHistory from './components/TransactionHistory';
import SignUp from './components/SignUp';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import LiteWallet from './components/LiteWallet';
import Contacts from './components/Contacts';
import GoldInvestment from './components/GoldInvestment';
import RewardsPage from './components/RewardsPage';
import ProfilePage from './components/ProfilePage';

const getDefaultProfile = () => ({
  name: '',
  upiId: '',
  phoneNumber: '',
  email: '',
  bankAccountNumber: 'XXXX XXXX 2847',
  upiPin: '',
  profilePicture: '👤'
});

function App() {
  const getUserStorageKey = (suffix, userId = localStorage.getItem('upiActiveUser') || 'default-user') => {
    const safeUserId = String(userId || 'default-user').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    return `upi_${safeUserId}_${suffix}`;
  };

  const clearStoredUserData = () => {
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('upi_') || key === 'upiActiveUser' || key === 'upiTheme')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => localStorage.removeItem(key));
  };

  const [currentPage, setCurrentPage] = useState('landing');
  const [theme, setTheme] = useState(() => localStorage.getItem('upiTheme') || 'light');
  const [showQr, setShowQr] = useState(false);
  const [activeUserId, setActiveUserId] = useState(() => localStorage.getItem('upiActiveUser') || 'default-user');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(getUserStorageKey('transactions', localStorage.getItem('upiActiveUser') || 'default-user'));
    return saved ? JSON.parse(saved) : [];
  });
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem(getUserStorageKey('balance', localStorage.getItem('upiActiveUser') || 'default-user'));
    return saved ? JSON.parse(saved) : 5000;
  });
  const [liteBalance, setLiteBalance] = useState(() => {
    const saved = localStorage.getItem(getUserStorageKey('liteBalance', localStorage.getItem('upiActiveUser') || 'default-user'));
    return saved ? JSON.parse(saved) : 0;
  });
  const [goldPrice, setGoldPrice] = useState(() => {
    const saved = localStorage.getItem('goldPrice');
    return saved ? Number(saved) : 6580;
  });
  const [goldBalance, setGoldBalance] = useState(() => {
    const saved = localStorage.getItem('goldBalance');
    return saved ? Number(saved) : 0;
  });
  const [goldHistory, setGoldHistory] = useState(() => {
    const saved = localStorage.getItem('goldHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [silverPrice, setSilverPrice] = useState(() => {
    const saved = localStorage.getItem('silverPrice');
    return saved ? Number(saved) : 92;
  });
  const [silverBalance, setSilverBalance] = useState(() => {
    const saved = localStorage.getItem('silverBalance');
    return saved ? Number(saved) : 0;
  });
  const [silverHistory, setSilverHistory] = useState(() => {
    const saved = localStorage.getItem('silverHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [rewardTab, setRewardTab] = useState('cashback');
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(getUserStorageKey('profile', localStorage.getItem('upiActiveUser') || 'default-user'));
    return saved ? JSON.parse(saved) : getDefaultProfile();
  });
  const [pinModal, setPinModal] = useState({ open: false, mode: 'set', actionName: '', error: '' });
  const [pinInput, setPinInput] = useState('');
  const [pendingPinAction, setPendingPinAction] = useState(null);

  useEffect(() => {
    clearStoredUserData();
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(getUserStorageKey('transactions', activeUserId), JSON.stringify(transactions));
  }, [transactions, activeUserId]);

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(getUserStorageKey('balance', activeUserId), JSON.stringify(balance));
  }, [balance, activeUserId]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('upiTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(getUserStorageKey('profile', activeUserId), JSON.stringify(userProfile));
  }, [userProfile, activeUserId]);

  useEffect(() => {
    localStorage.setItem(getUserStorageKey('liteBalance', activeUserId), JSON.stringify(liteBalance));
  }, [liteBalance, activeUserId]);

  useEffect(() => {
    localStorage.setItem('goldPrice', String(goldPrice));
  }, [goldPrice]);

  useEffect(() => {
    localStorage.setItem('goldBalance', String(goldBalance));
  }, [goldBalance]);

  useEffect(() => {
    localStorage.setItem('goldHistory', JSON.stringify(goldHistory));
  }, [goldHistory]);

  useEffect(() => {
    localStorage.setItem('silverPrice', String(silverPrice));
  }, [silverPrice]);

  useEffect(() => {
    localStorage.setItem('silverBalance', String(silverBalance));
  }, [silverBalance]);

  useEffect(() => {
    localStorage.setItem('silverHistory', JSON.stringify(silverHistory));
  }, [silverHistory]);

  // Track mouse position for background gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth * 100;
      const y = e.clientY / window.innerHeight * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openPinModal = (mode, actionName, callback = null) => {
    setPendingPinAction(() => callback || null);
    setPinInput('');
    setPinModal({ open: true, mode, actionName, error: '' });
  };

  const closePinModal = () => {
    setPinModal({ open: false, mode: 'set', actionName: '', error: '' });
    setPinInput('');
    setPendingPinAction(null);
  };

  const handlePinSubmit = () => {
    const cleanedPin = pinInput.replace(/\D/g, '');

    if (cleanedPin.length !== 4) {
      setPinModal((prev) => ({ ...prev, error: 'UPI PIN must be exactly 4 digits.' }));
      return;
    }

    if (pinModal.mode === 'set') {
      setUserProfile((prev) => ({ ...prev, upiPin: cleanedPin }));
      alert('UPI PIN set successfully.');
    } else if (pinModal.mode === 'verify') {
      if (String(userProfile.upiPin || '').trim() !== cleanedPin) {
        setPinModal((prev) => ({ ...prev, error: 'Incorrect UPI PIN.' }));
        return;
      }
    }

    const callback = pendingPinAction;
    closePinModal();

    if (callback) {
      callback();
    }
  };

  const handleSignup = (profileData) => {
    const userKey = profileData.upiId || profileData.email || 'default-user';
    const nextProfile = {
      ...profileData,
      bankAccountNumber: profileData.bankAccountNumber || 'XXXX XXXX 2847',
      upiPin: profileData.upiPin || '',
      profilePicture: profileData.profilePicture || '👤'
    };

    setActiveUserId(userKey);
    localStorage.setItem('upiActiveUser', userKey);
    setUserProfile(nextProfile);
    setCurrentPage('dashboard');
    openPinModal('set', 'secure your account');
  };

  const requireUpiPin = (actionName, onVerified) => {
    const storedPin = String(userProfile.upiPin || '').trim();

    if (!storedPin) {
      openPinModal('set', actionName, () => {
        if (onVerified) onVerified();
      });
      return;
    }

    openPinModal('verify', actionName, () => {
      if (onVerified) onVerified();
    });
  };

  const handleAddToLite = (amount) => {
    requireUpiPin('add money to Lite Wallet', () => {
      setLiteBalance((prev) => prev + Number(amount));
    });
  };

  const handleClaimReward = (reward) => {
    const amount = Number(reward?.amount ?? 0);

    if (amount > 0) {
      setBalance((prevBalance) => prevBalance + amount);
      alert(`Reward claimed successfully! ₹${amount.toLocaleString('en-IN')} has been added to your total balance.`);
      return;
    }

    alert('Reward claimed successfully!');
  };

  const handleLogin = (profileData) => {
    const email = profileData?.email?.trim() || '';

    if (email) {
      const userKey = email;
      const nameFromEmail = email.split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      setActiveUserId(userKey);
      localStorage.setItem('upiActiveUser', userKey);
      setUserProfile({
        name: nameFromEmail,
        upiId: email,
        phoneNumber: '',
        email,
        bankAccountNumber: 'XXXX XXXX 2847',
        profilePicture: '👤'
      });
    } else {
      setUserProfile(getDefaultProfile());
    }

    setCurrentPage('dashboard');
  };

  const executeSendMoney = (paymentData) => {
    if (balance >= paymentData.amount) {
      const newTransaction = {
        id: transactions.length + 1,
        type: 'debit',
        amount: Number(paymentData.amount),
        recipient: paymentData.recipientUPI || paymentData.recipientPhone,
        receiverName: paymentData.receiverName,
        recipientUPI: paymentData.recipientUPI,
        recipientPhone: paymentData.recipientPhone,
        description: paymentData.description,
        timestamp: new Date().toLocaleString(),
        status: 'success'
      };
      
      setTransactions([newTransaction, ...transactions]);
      setBalance(balance - Number(paymentData.amount));
      setCurrentPage('history');
    } else {
      alert('Insufficient balance!');
    }
  };

  const handleSendMoney = (paymentData) => {
    requireUpiPin('complete this payment', () => {
      executeSendMoney(paymentData);
    });
  };

  const handleDeleteTransaction = (transactionId, transactionType, transactionAmount) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((tx) => tx.id !== transactionId)
    );

    if (transactionType === 'debit') {
      setBalance((prevBalance) => prevBalance + Number(transactionAmount));
    } else {
      setBalance((prevBalance) => prevBalance - Number(transactionAmount));
    }
  };

  const qrData = `upi://pay?pa=${encodeURIComponent(userProfile.upiId)}&pn=${encodeURIComponent(userProfile.name)}&am=0&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrData)}`;
  const showMainAppShell = ['dashboard', 'send', 'history', 'lite', 'contacts', 'gold-buy', 'gold-sell', 'gold-vault', 'gold-redeem', 'silver-buy', 'silver-sell', 'silver-vault', 'silver-redeem', 'rewards', 'profile'].includes(currentPage);

  const handleGoldBuy = (amount) => {
    const money = Number(amount);
    if (!money || money <= 0) return;

    const grams = money / goldPrice;
    setGoldBalance((prev) => Number((prev + grams).toFixed(4)));
    setGoldHistory((prev) => [{
      id: Date.now(),
      type: 'invested',
      label: 'Gold Bought',
      amount: money,
      grams,
      date: new Date().toLocaleString()
    }, ...prev]);
    setCurrentPage('dashboard');
  };

  const handleGoldSell = (grams) => {
    const amount = Number(grams) * goldPrice;
    if (!grams || grams <= 0 || amount <= 0) return;

    setGoldBalance((prev) => Number(Math.max(prev - Number(grams), 0).toFixed(4)));
    setGoldHistory((prev) => [{
      id: Date.now(),
      type: 'sold',
      label: 'Gold Sold',
      amount,
      grams: Number(grams),
      date: new Date().toLocaleString()
    }, ...prev]);
    setCurrentPage('dashboard');
  };

  const handleSilverBuy = (amount) => {
    const money = Number(amount);
    if (!money || money <= 0) return;

    const grams = money / silverPrice;
    setSilverBalance((prev) => Number((prev + grams).toFixed(4)));
    setSilverHistory((prev) => [{
      id: Date.now(),
      type: 'invested',
      label: 'Silver Bought',
      amount: money,
      grams,
      date: new Date().toLocaleString()
    }, ...prev]);
    setCurrentPage('dashboard');
  };

  const handleSilverSell = (grams) => {
    const amount = Number(grams) * silverPrice;
    if (!grams || grams <= 0 || amount <= 0) return;

    setSilverBalance((prev) => Number(Math.max(prev - Number(grams), 0).toFixed(4)));
    setSilverHistory((prev) => [{
      id: Date.now(),
      type: 'sold',
      label: 'Silver Sold',
      amount,
      grams: Number(grams),
      date: new Date().toLocaleString()
    }, ...prev]);
    setCurrentPage('dashboard');
  };

  return (
    <div className="app-container">
      {showMainAppShell && (
        <header className="app-header">
          <div className="header-content">
            <div className="header-brand">
              <img src={logo2} alt="SCORSA logo" className="navi-logo" />
              <div className="brand-text">
                <h1>SCORSA</h1>
                <p className="brand-tagline">UPI Payment System</p>
              </div>
            </div>
            <div className="header-user">
              <button
                type="button"
                className="theme-toggle"
                onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              >
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <button type="button" className="header-qr-btn" onClick={() => setShowQr(true)}>
                QR
              </button>
              <button type="button" className="user-chip" onClick={() => setCurrentPage('profile')}>
                <span className="profile-pic">{userProfile.profilePicture}</span>
                <span className="user-name">{userProfile.name}</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {showMainAppShell && (
        <nav className="app-nav">
          <button 
            className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${currentPage === 'contacts' ? 'active' : ''}`}
            onClick={() => setCurrentPage('contacts')}
          >
            Contacts
          </button>
          <button 
            className={`nav-btn ${currentPage === 'send' ? 'active' : ''}`}
            onClick={() => setCurrentPage('send')}
          >
            Send Money
          </button>
          <button 
            className={`nav-btn ${currentPage === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentPage('history')}
          >
            Transactions
          </button>
        </nav>
      )}

      <main className="app-main">
        {currentPage === 'landing' && (
          <LandingPage
            onGoToSignup={() => setCurrentPage('signup')}
            onGoToLogin={() => setCurrentPage('login')}
          />
        )}
        {currentPage === 'signup' && (
          <SignUp
            onSignup={handleSignup}
            existingProfile={userProfile}
            onGoToLogin={() => setCurrentPage('login')}
          />
        )}
        {currentPage === 'login' && (
          <Login
            onLogin={handleLogin}
            existingProfile={userProfile}
            onGoToSignup={() => setCurrentPage('signup')}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            balance={balance}
            userProfile={userProfile}
            onReceiveClick={() => setCurrentPage('send')}
            onTransactionClick={() => setCurrentPage('history')}
            recentTransactions={transactions.slice(0, 5)}
            onOpenLite={() => setCurrentPage('lite')}
            onRequestClick={() => setCurrentPage('contacts')}
            onBuyGold={() => setCurrentPage('gold-buy')}
            onSellGold={() => setCurrentPage('gold-sell')}
            onViewVault={() => setCurrentPage('gold-vault')}
            onRedeemGold={() => setCurrentPage('gold-redeem')}
            onOpenCashback={() => {
              setRewardTab('cashback');
              setCurrentPage('rewards');
            }}
            onOpenVouchers={() => {
              setRewardTab('vouchers');
              setCurrentPage('rewards');
            }}
            onBuySilver={() => setCurrentPage('silver-buy')}
            onSellSilver={() => setCurrentPage('silver-sell')}
            onViewSilverVault={() => setCurrentPage('silver-vault')}
            onRedeemSilver={() => setCurrentPage('silver-redeem')}
          />
        )}
        {currentPage === 'contacts' && (
          <Contacts onBack={() => setCurrentPage('dashboard')} />
        )}
        {currentPage === 'gold-buy' && (
          <GoldInvestment
            type="buy"
            goldPrice={goldPrice}
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleGoldBuy}
          />
        )}
        {currentPage === 'gold-sell' && (
          <GoldInvestment
            type="sell"
            goldPrice={goldPrice}
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleGoldSell}
          />
        )}
        {currentPage === 'gold-vault' && (
          <GoldInvestment
            type="vault"
            goldPrice={goldPrice}
            goldBalance={goldBalance}
            goldHistory={goldHistory}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
        {currentPage === 'gold-redeem' && (
          <GoldInvestment
            type="redeem"
            goldPrice={goldPrice}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
        {currentPage === 'silver-buy' && (
          <GoldInvestment
            type="buy"
            metal="silver"
            silverPrice={silverPrice}
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleSilverBuy}
          />
        )}
        {currentPage === 'silver-sell' && (
          <GoldInvestment
            type="sell"
            metal="silver"
            silverPrice={silverPrice}
            onBack={() => setCurrentPage('dashboard')}
            onSubmit={handleSilverSell}
          />
        )}
        {currentPage === 'silver-vault' && (
          <GoldInvestment
            type="vault"
            metal="silver"
            silverPrice={silverPrice}
            silverBalance={silverBalance}
            silverHistory={silverHistory}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
        {currentPage === 'silver-redeem' && (
          <GoldInvestment
            type="redeem"
            metal="silver"
            silverPrice={silverPrice}
            onBack={() => setCurrentPage('dashboard')}
          />
        )}
        {currentPage === 'rewards' && (
          <RewardsPage
            activeTab={rewardTab}
            onTabChange={setRewardTab}
            onBack={() => setCurrentPage('dashboard')}
            onClaimReward={handleClaimReward}
          />
        )}
        {currentPage === 'lite' && (
          <LiteWallet liteBalance={liteBalance} onAddToLite={handleAddToLite} />
        )}
        {currentPage === 'send' && (
          <PaymentForm 
            onSubmit={handleSendMoney}
            userUPI={userProfile.upiId}
            balance={balance}
          />
        )}
        {currentPage === 'history' && (
          <TransactionHistory 
            transactions={transactions}
            userProfile={userProfile}
            balance={balance}
            onDeleteTransaction={handleDeleteTransaction}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage
            userProfile={userProfile}
            qrCodeUrl={qrCodeUrl}
            onBack={() => setCurrentPage('dashboard')}
            onChangePin={() => {
              const storedPin = String(userProfile.upiPin || '').trim();

              if (!storedPin) {
                openPinModal('set', 'set your UPI PIN', () => {
                  alert('UPI PIN set successfully.');
                });
                return;
              }

              openPinModal('verify', 'verify your current UPI PIN', () => {
                openPinModal('set', 'change your UPI PIN', () => {
                  alert('UPI PIN updated successfully.');
                });
              });
            }}
          />
        )}
      </main>

      {showMainAppShell && (
        <footer className="app-footer">
          <div className="footer-brand">🏢 SCORSA</div>
          <p>© 2026 SCORSA UPI Payment App. All rights reserved.</p>
        </footer>
      )}

      {showQr && (
        <div className="qr-modal-backdrop" onClick={() => setShowQr(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-header">
              <h3>UPI QR Code</h3>
              <button type="button" className="close-qr-btn" onClick={() => setShowQr(false)}>
                ✕
              </button>
            </div>
            <div className="qr-code-wrap">
              <img src={qrCodeUrl} alt="UPI QR code" className="qr-code" />
            </div>
            <div className="qr-details">
              <p className="qr-label">Pay to</p>
              <strong>{userProfile.name}</strong>
              <span>{userProfile.upiId}</span>
            </div>
          </div>
        </div>
      )}

      {pinModal.open && (
        <div className="qr-modal-backdrop" onClick={closePinModal}>
          <div className="qr-modal pin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="qr-header">
              <h3>{pinModal.mode === 'set' ? 'Set UPI PIN' : 'Enter UPI PIN'}</h3>
              <button type="button" className="close-qr-btn" onClick={closePinModal}>✕</button>
            </div>

            <p className="pin-modal-text">
              {pinModal.mode === 'set'
                ? `Create a 4-digit UPI PIN to ${pinModal.actionName}.`
                : `Enter your UPI PIN to ${pinModal.actionName}.`}
            </p>

            <input
              type="password"
              inputMode="numeric"
              maxLength="4"
              value={pinInput}
              className="pin-input"
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
            />

            {pinModal.error && <p className="pin-error">{pinModal.error}</p>}

            <div className="pin-actions">
              <button type="button" className="confirm-btn" onClick={handlePinSubmit}>
                {pinModal.mode === 'set' ? 'Save PIN' : 'Confirm'}
              </button>
              <button type="button" className="cancel-btn" onClick={closePinModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
