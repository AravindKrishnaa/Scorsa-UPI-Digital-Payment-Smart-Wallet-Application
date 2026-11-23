import React, { useState } from 'react';
import '../styles/TransactionHistory.css';
import TransactionDetail from './TransactionDetail';

function TransactionHistory({ transactions, userProfile, balance, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter(tx => {
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesSearch = 
      (tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.sender?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalDebit = transactions
    .filter(tx => tx.type === 'debit')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const totalCredit = transactions
    .filter(tx => tx.type === 'credit')
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Transaction History</h2>
        <div className="stats-grid">
          <div className="stat-card sent">
            <span className="stat-label">Total Sent</span>
            <span className="stat-amount">₹{totalDebit.toLocaleString('en-IN')}</span>
          </div>
          <div className="stat-card received">
            <span className="stat-label">Total Received</span>
            <span className="stat-amount">₹{totalCredit.toLocaleString('en-IN')}</span>
          </div>
          <div className="stat-card balance">
            <span className="stat-label">Account Balance</span>
            <span className="stat-amount">₹{Number(balance).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search by UPI ID or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filterType === 'credit' ? 'active' : ''}`}
            onClick={() => setFilterType('credit')}
          >
            Received
          </button>
          <button 
            className={`filter-btn ${filterType === 'debit' ? 'active' : ''}`}
            onClick={() => setFilterType('debit')}
          >
            Sent
          </button>
        </div>
      </div>

      <div className="transactions-section">
        {filteredTransactions.length > 0 ? (
          <div className="transactions-list">
            {filteredTransactions.map((tx) => (
              <div 
                key={tx.id} 
                className={`transaction-card ${tx.type}`}
                onClick={() => setSelectedTransaction(tx)}
                role="button"
                tabIndex={0}
              >
                <div className="tx-icon-wrapper">
                  <span className="tx-icon">{tx.type === 'credit' ? '📥' : '📤'}</span>
                </div>
                
                <div className="tx-main-info">
                  <div className="tx-party">
                    <p className="tx-type">
                      {tx.type === 'credit' 
                        ? `Received from ${tx.sender}` 
                        : `Sent to ${tx.receiverName || tx.recipient}`}
                    </p>
                    <p className="tx-desc">{tx.description}</p>
                  </div>
                  <p className="tx-datetime">{tx.timestamp}</p>
                </div>

                <div className="tx-amount-wrapper">
                  <span className={`tx-amount ${tx.type}`}>
                    {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <span className={`tx-status ${tx.status}`}>
                    {tx.status === 'success' ? '✓ Success' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-transactions">
            <p>📭 No transactions found</p>
            {searchTerm && <p className="text-muted">Try adjusting your search terms</p>}
          </div>
        )}
      </div>

      {selectedTransaction && (
        <TransactionDetail 
          transaction={selectedTransaction}
          userProfile={userProfile}
          onClose={() => setSelectedTransaction(null)}
          onDeleteTransaction={onDeleteTransaction}
        />
      )}
    </div>
  );
}

export default TransactionHistory;
