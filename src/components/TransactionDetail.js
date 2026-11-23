import React, { useState } from 'react';
import '../styles/TransactionDetail.css';

function TransactionDetail({ transaction, userProfile, onClose, onDeleteTransaction }) {
  const [templateSelected, setTemplateSelected] = useState(false);

  const downloadPDFWithTemplate = (template) => {
    let htmlContent = '';

    if (template === 'professional') {
      htmlContent = `
        <html>
          <head>
            <title>Transaction Receipt - ${transaction.id}</title>
            <style>
              * { margin: 0; padding: 0; }
              body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; }
              .container { max-width: 800px; margin: 20px auto; background: white; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 8px; }
              .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #667eea; padding-bottom: 20px; }
              .logo { font-size: 32px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
              .company-info { color: #999; font-size: 12px; }
              .receipt-id { color: #667eea; font-weight: bold; margin-top: 10px; }
              .section { margin-bottom: 30px; }
              .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; margin-bottom: 15px; letter-spacing: 1px; }
              .row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dotted #ddd; padding-bottom: 8px; }
              .label { color: #999; font-size: 12px; font-weight: 600; text-transform: uppercase; }
              .value { color: #333; font-weight: 500; text-align: right; }
              .amount { font-size: 24px; font-weight: bold; color: ${transaction.type === 'credit' ? '#2ecc71' : '#e74c3c'}; }
              .status-success { background: #d4edda; color: #155724; padding: 6px 12px; border-radius: 4px; display: inline-block; font-size: 12px; font-weight: 600; }
              .divider { border-top: 2px solid #f0f0f0; margin: 20px 0; }
              .footer { text-align: center; color: #999; font-size: 10px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
              .qr-section { text-align: center; margin: 20px 0; }
              .qr-text { color: #999; font-size: 11px; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">🏢 SCORSA UPI</div>
                <div class="company-info">Scorsa Payment Interface System</div>
                <div class="receipt-id">Receipt ID: #${transaction.id}</div>
              </div>

              <div class="section">
                <div class="section-title">Transaction Summary</div>
                <div class="row">
                  <span class="label">Type</span>
                  <span class="value">${transaction.type === 'credit' ? '📥 Received' : '📤 Sent'}</span>
                </div>
                <div class="row">
                  <span class="label">Amount</span>
                  <span class="value amount">${transaction.type === 'credit' ? '+' : '-'}₹${transaction.amount.toLocaleString('en-IN')}</span>
                </div>
                <div class="row">
                  <span class="label">Status</span>
                  <span class="value"><span class="status-success">✓ ${transaction.status.toUpperCase()}</span></span>
                </div>
                <div class="row">
                  <span class="label">Date & Time</span>
                  <span class="value">${transaction.timestamp}</span>
                </div>
              </div>

              <div class="divider"></div>

              <div class="section">
                <div class="section-title">Participants</div>
                <div class="row">
                  <span class="label">From</span>
                  <span class="value">${transaction.type === 'debit' ? 'Aravind krishnaa' : transaction.sender || 'Unknown'}</span>
                </div>
                ${transaction.type === 'debit' ? `
                  <div class="row">
                    <span class="label">To</span>
                    <span class="value">${transaction.recipientUPI || transaction.recipientPhone}</span>
                  </div>
                  ${transaction.receiverName ? `
                    <div class="row">
                      <span class="label">Receiver Name</span>
                      <span class="value">${transaction.receiverName}</span>
                    </div>
                  ` : ''}
                ` : ''}
              </div>

              ${transaction.description ? `
                <div class="divider"></div>
                <div class="section">
                  <div class="section-title">Additional Details</div>
                  <div class="row" style="flex-direction: column; border-bottom: none;">
                    <span class="label">Note / Description</span>
                    <span class="value" style="text-align: left; margin-top: 8px;">${transaction.description}</span>
                  </div>
                </div>
              ` : ''}

              <div class="divider"></div>

              <div class="section">
                <div class="section-title">Account Information</div>
                <div class="row">
                  <span class="label">Account Name</span>
                  <span class="value">${userProfile.name}</span>
                </div>
                <div class="row">
                  <span class="label">UPI ID</span>
                  <span class="value">${userProfile.upiId}</span>
                </div>
                <div class="row">
                  <span class="label">Phone</span>
                  <span class="value">${userProfile.phoneNumber}</span>
                </div>
              </div>

              <div class="footer">
                <p>This is an electronically generated receipt. No signature required.</p>
                <p style="margin-top: 10px; color: #bbb;">© 2026 SCORSA UPI App. All transactions are secure and encrypted.</p>
              </div>
            </div>
          </body>
        </html>
      `;
    } else if (template === 'simple') {
      htmlContent = `
        <html>
          <head>
            <title>Transaction Receipt - ${transaction.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .title { font-size: 20px; font-weight: bold; }
              .content { line-height: 1.8; }
              .row { margin-bottom: 10px; }
              .label { font-weight: bold; width: 40%; display: inline-block; }
              .value { width: 55%; display: inline-block; }
              .amount { font-size: 18px; font-weight: bold; color: ${transaction.type === 'credit' ? 'green' : 'red'}; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">UPI Transaction Receipt</div>
              <div>Receipt ID: ${transaction.id}</div>
            </div>
            <div class="content">
              <div class="row"><span class="label">Type:</span><span class="value">${transaction.type === 'credit' ? 'Received' : 'Sent'}</span></div>
              <div class="row"><span class="label">Amount:</span><span class="value amount">${transaction.type === 'credit' ? '+' : '-'}₹${transaction.amount.toLocaleString('en-IN')}</span></div>
              <div class="row"><span class="label">Status:</span><span class="value">${transaction.status}</span></div>
              <div class="row"><span class="label">Date:</span><span class="value">${transaction.timestamp}</span></div>
              <hr>
              <div class="row"><span class="label">From:</span><span class="value">${transaction.type === 'debit' ? 'Aravind krishnaa' : transaction.sender || 'Unknown'}</span></div>
              ${transaction.type === 'debit' ? `<div class="row"><span class="label">To:</span><span class="value">${transaction.recipientUPI || transaction.recipientPhone}</span></div>` : ''}
              ${transaction.receiverName ? `<div class="row"><span class="label">Receiver:</span><span class="value">${transaction.receiverName}</span></div>` : ''}
              <hr>
              <div class="row"><span class="label">Account:</span><span class="value">${userProfile.name}</span></div>
              <div class="row"><span class="label">UPI ID:</span><span class="value">${userProfile.upiId}</span></div>
              ${transaction.description ? `<div class="row"><span class="label">Note:</span><span class="value">${transaction.description}</span></div>` : ''}
            </div>
          </body>
        </html>
      `;
    } else if (template === 'detailed') {
      htmlContent = `
        <html>
          <head>
            <title>Transaction Receipt - ${transaction.id}</title>
            <style>
              body { font-family: 'Georgia', serif; background-color: #f9f9f9; margin: 0; padding: 20px; }
              .page { background: white; padding: 40px; max-width: 900px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
              .header-section { text-align: center; border-bottom: 5px double #667eea; padding-bottom: 20px; margin-bottom: 30px; }
              .company-name { font-size: 28px; font-weight: bold; color: #667eea; }
              .subtitle { color: #666; font-size: 12px; margin-top: 5px; }
              .content-section { margin-bottom: 25px; }
              .section-header { font-size: 14px; font-weight: bold; text-transform: uppercase; color: white; background: #667eea; padding: 10px 15px; letter-spacing: 1px; }
              .detail-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              .detail-table td { padding: 12px 15px; border-bottom: 1px solid #ddd; }
              .detail-table .label { font-weight: bold; width: 35%; color: #333; }
              .detail-table .value { color: #555; }
              .amount-cell { font-size: 16px; font-weight: bold; color: ${transaction.type === 'credit' ? '#2ecc71' : '#e74c3c'}; }
              .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 11px; }
              hr { border: none; border-top: 2px solid #f0f0f0; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="page">
              <div class="header-section">
                <div class="company-name">🏢 SCORSA - UPI Payment</div>
                <div class="subtitle">Official Scorsa Transaction Receipt</div>
                <div style="margin-top: 10px; font-weight: bold;">Reference: TXN-${transaction.id}</div>
              </div>

              <div class="content-section">
                <div class="section-header">TRANSACTION DETAILS</div>
                <table class="detail-table">
                  <tr>
                    <td class="label">Transaction Type:</td>
                    <td class="value">${transaction.type === 'credit' ? '✓ RECEIVED' : '✓ SENT'}</td>
                  </tr>
                  <tr>
                    <td class="label">Transaction Amount:</td>
                    <td class="value amount-cell">${transaction.type === 'credit' ? '+' : '-'}₹${transaction.amount.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td class="label">Transaction Status:</td>
                    <td class="value" style="color: green; font-weight: bold;">✓ ${transaction.status.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td class="label">Date & Time:</td>
                    <td class="value">${transaction.timestamp}</td>
                  </tr>
                </table>
              </div>

              <hr>

              <div class="content-section">
                <div class="section-header">PARTIES INVOLVED</div>
                <table class="detail-table">
                  <tr>
                    <td class="label">Sender:</td>
                    <td class="value">${transaction.type === 'debit' ? 'Aravind krishnaa' : transaction.sender || 'Unknown'}</td>
                  </tr>
                  ${transaction.type === 'debit' ? `
                    <tr>
                      <td class="label">Recipient:</td>
                      <td class="value">${transaction.recipientUPI || transaction.recipientPhone}</td>
                    </tr>
                    ${transaction.receiverName ? `
                      <tr>
                        <td class="label">Recipient Name:</td>
                        <td class="value">${transaction.receiverName}</td>
                      </tr>
                    ` : ''}
                  ` : ''}
                </table>
              </div>

              <hr>

              <div class="content-section">
                <div class="section-header">ACCOUNT INFORMATION</div>
                <table class="detail-table">
                  <tr>
                    <td class="label">Account Name:</td>
                    <td class="value">${userProfile.name}</td>
                  </tr>
                  <tr>
                    <td class="label">UPI ID:</td>
                    <td class="value">${userProfile.upiId}</td>
                  </tr>
                  <tr>
                    <td class="label">Phone Number:</td>
                    <td class="value">${userProfile.phoneNumber}</td>
                  </tr>
                </table>
              </div>

              ${transaction.description ? `
                <hr>
                <div class="content-section">
                  <div class="section-header">REMARKS</div>
                  <table class="detail-table">
                    <tr>
                      <td class="label">Description:</td>
                      <td class="value">${transaction.description}</td>
                    </tr>
                  </table>
                </div>
              ` : ''}

              <div class="footer">
                <p><strong>Important Notice:</strong></p>
                <p>This document is an electronically generated receipt and does not require any signature or seal.</p>
                <p>Transaction has been successfully recorded in your account.</p>
                <p style="margin-top: 15px; color: #bbb;">© 2026 SCORSA UPI Application • All Rights Reserved • Secure Transaction</p>
              </div>
            </div>
          </body>
        </html>
      `;
    }

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      setTemplateSelected(false);
    }, 250);
  };

  const shareTransaction = () => {
    const shareText = `
UPI Transaction Receipt
========================
Transaction ID: ${transaction.id}
Type: ${transaction.type === 'credit' ? 'Received' : 'Sent'}
Amount: ₹${transaction.amount.toLocaleString('en-IN')}
${transaction.receiverName ? `Name: ${transaction.receiverName}` : ''}
${transaction.recipientUPI ? `Recipient UPI: ${transaction.recipientUPI}` : ''}
${transaction.recipientPhone ? `Recipient Phone: ${transaction.recipientPhone}` : ''}
Date: ${transaction.timestamp}
${transaction.description ? `Description: ${transaction.description}` : ''}
Status: ${transaction.status}
    `;

    // Try to use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: 'UPI Transaction Receipt',
        text: shareText,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Transaction details copied to clipboard!');
    }
  };

  const copyToClipboard = () => {
    const text = `Transaction ID: ${transaction.id}
Amount: ₹${transaction.amount}
${transaction.recipientUPI || transaction.recipientPhone}
Date: ${transaction.timestamp}`;
    
    navigator.clipboard.writeText(text);
    alert('Transaction details copied to clipboard!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction?.(transaction.id, transaction.type, transaction.amount);
      onClose();
    }
  };

  return (
    <div className="transaction-detail-overlay">
      <div className="transaction-detail-modal">
        <div className="detail-top-actions">
          <button className="delete-transaction-btn" onClick={handleDelete} title="Delete transaction" aria-label="Delete transaction">
            🗑️
          </button>
          <button className="detail-close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div id="transaction-detail-content" className="detail-content">
          <div className="receipt-header">
            <h2>Transaction Receipt</h2>
            <p className="receipt-id">Receipt ID: {transaction.id}</p>
          </div>

          <div className="detail-section">
            <h3>Transaction Details</h3>
            
            <div className="detail-row">
              <span className="detail-label">Transaction Type</span>
              <span className={`detail-value ${transaction.type}`}>
                {transaction.type === 'credit' ? '📥 Received' : '📤 Sent'}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Amount</span>
              <span className={`detail-value amount ${transaction.type}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span className={`detail-value status ${transaction.status}`}>
                {transaction.status === 'success' ? '✓ Success' : 'Pending'}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Date & Time</span>
              <span className="detail-value">{transaction.timestamp}</span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="detail-section">
            <h3>Participant Details</h3>
            
            <div className="detail-row">
              <span className="detail-label">From (Sender)</span>
              <span className="detail-value">{transaction.type === 'debit' ? 'Aravind krishnaa' : transaction.sender || 'Unknown'}</span>
            </div>

            {transaction.type === 'debit' && (
              <>
                <div className="detail-row">
                  <span className="detail-label">To (Receiver)</span>
                  <span className="detail-value">{transaction.recipientUPI || transaction.recipientPhone}</span>
                </div>

                {transaction.receiverName && (
                  <div className="detail-row">
                    <span className="detail-label">Receiver Name</span>
                    <span className="detail-value">{transaction.receiverName}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {transaction.description && (
            <>
              <div className="divider"></div>
              <div className="detail-section">
                <h3>Additional Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Description/Note</span>
                  <span className="detail-value">{transaction.description}</span>
                </div>
              </div>
            </>
          )}

          <div className="divider"></div>

          <div className="detail-section">
            <h3>Your Account</h3>
            
            <div className="detail-row">
              <span className="detail-label">Account Name</span>
              <span className="detail-value">{userProfile.name}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">UPI ID</span>
              <span className="detail-value">{userProfile.upiId}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Phone Number</span>
              <span className="detail-value">{userProfile.phoneNumber}</span>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="action-btn download-btn" onClick={() => setTemplateSelected(true)}>
            <span>📥 Download as PDF</span>
          </button>
          <button className="action-btn share-btn" onClick={shareTransaction}>
            <span>📤 Share</span>
          </button>
          <button className="action-btn copy-btn" onClick={copyToClipboard}>
            <span>📋 Copy Details</span>
          </button>
        </div>

        {templateSelected && (
          <div className="template-selector-overlay">
            <div className="template-selector">
              <h3>Select PDF Template</h3>
              <p>Choose your preferred receipt template style</p>
              
              <div className="template-options">
                <div className="template-option" onClick={() => downloadPDFWithTemplate('professional')}>
                  <div className="template-icon">💼</div>
                  <div className="template-name">Professional</div>
                  <div className="template-desc">Clean, modern design with company branding</div>
                </div>

                <div className="template-option" onClick={() => downloadPDFWithTemplate('simple')}>
                  <div className="template-icon">📄</div>
                  <div className="template-name">Simple</div>
                  <div className="template-desc">Minimal and lightweight format</div>
                </div>

                <div className="template-option" onClick={() => downloadPDFWithTemplate('detailed')}>
                  <div className="template-icon">📋</div>
                  <div className="template-name">Detailed</div>
                  <div className="template-desc">Comprehensive with all transaction details</div>
                </div>
              </div>

              <button className="template-cancel-btn" onClick={() => setTemplateSelected(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionDetail;
