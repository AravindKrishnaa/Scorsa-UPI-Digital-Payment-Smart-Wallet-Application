# UPI Payment Application - React

A modern, fully-functional React application for managing UPI (Unified Payments Interface) payments. This application includes a dashboard, payment sending functionality, and transaction history tracking.

## Features

✨ **Key Features:**
- 💰 Account balance display
- 📤 Send money via UPI ID
- 📥 Receive money tracking
- 📊 Transaction history with filtering
- 🔍 Search transactions
- 📈 Transaction statistics
- 💳 User profile management
- 📱 Fully responsive design
- ✅ Form validation
- 🎨 Modern gradient UI

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js           # Main dashboard view
│   ├── PaymentForm.js         # Payment sending form
│   └── TransactionHistory.js  # Transaction history view
├── styles/
│   ├── Dashboard.css
│   ├── PaymentForm.css
│   └── TransactionHistory.css
├── App.js                      # Main app component
├── App.css                     # App styling
├── index.js                    # Entry point
└── index.css                   # Global styles
public/
└── index.html                  # HTML template
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm start
```

3. **Open in browser:**
```
http://localhost:3000
```

## Component Details

### Dashboard
- Displays current account balance
- Shows quick action buttons (Send, Receive, Request)
- Displays user profile information
- Shows recent transactions

### Payment Form
- Input for recipient UPI ID
- Amount entry with validation
- Optional transaction description
- Confirmation dialog before payment
- Form validation with error messages

### Transaction History
- Complete list of all transactions
- Filter by transaction type (All, Sent, Received)
- Search functionality
- Transaction statistics
- Success/Pending status indicators

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject (one-way operation)
npm eject
```

## Technologies Used

- **React 18** - UI library
- **CSS3** - Styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript

## Features Explained

### Dashboard
- Real-time balance display
- Quick action buttons for common operations
- Profile information section
- Recent transaction feed

### Payment Processing
- UPI ID validation
- Amount validation with balance check
- Confirmation screen before transaction
- Transaction confirmation with details

### Transaction History
- Complete transaction list
- Filter by type (credit/debit)
- Search by UPI ID or description
- Statistics for sent and received amounts
- Transaction status indicators

## Styling

The application uses a modern gradient color scheme:
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Pink-Red gradient (#f093fb to #f5576c)
- **Accent**: Cyan gradient (#4facfe to #00f2fe)

## Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop screens (1024px+)

## State Management

The app uses React hooks for state management:
- `useState` for managing transactions, balance, and current page
- Local component state for form handling

## Future Enhancements

- Backend API integration
- User authentication
- Payment gateway integration
- QR code generation and scanning
- Transaction receipts
- Multiple account support
- Favorites/Contacts list
- Bill payments
- Money transfer to bank accounts

## Notes

- This is a demo application with mock data
- Transactions are stored in component state (resets on refresh)
- For production use, integrate with a real payment backend
- Balance starts at ₹5000 for demo purposes

## License

This project is open source and available for educational purposes.
