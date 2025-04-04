# Ionic Banking App

A mobile banking application built with Ionic React, demonstrating how to create a modern, responsive financial app interface.

## What is Ionic?

Ionic is an open-source UI toolkit for building performant, high-quality mobile and desktop apps using web technologies (HTML, CSS, and JavaScript/TypeScript). It allows developers to build once and deploy to multiple platforms:

- iOS
- Android
- Progressive Web Apps (PWAs)
- Desktop applications

Ionic provides a library of UI components, gestures, and tools that adhere to platform standards and best practices.

## Project Setup

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd ionic-react
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Core Features

### 1. Account Management

- View multiple accounts (savings, checking, credit cards)
- Check account balances
- See account details and transaction history

### 2. Transaction History

- View recent transactions
- Filter transactions by type (income, expenses, transfers)
- Search transactions
- Categorized transaction display

### 3. Banking Services

- Quick access to common banking features
- Service category navigation

## Project Structure

### Pages

The app consists of three main pages:

#### 1. Home (Banking Dashboard)

- Located at: `src/pages/Home.tsx`
- Features:
  - Account card carousel
  - Current balance display
  - Banking services grid
  - Touch and drag interactions

#### 2. Transactions

- Located at: `src/pages/Transactions.tsx`
- Features:
  - Transaction listing
  - Filtering by transaction type
  - Search functionality
  - Visual categorization of transactions

#### 3. Account

- Located at: `src/pages/Account.tsx`
- Features:
  - User profile information
  - Account settings

### Services

The main service is the `BankingService`, located at `src/services/BankingService.ts`. It handles:

- Data models (interfaces for Account and Transaction)
- Mock data for demonstration
- Methods for retrieving and manipulating financial data
- Utility methods for formatting

## Data Models

### Account

```typescript
interface Account {
  id: string;
  type: "savings" | "current" | "visa" | "mastercard";
  name: string;
  accountNumber: string;
  balance: number;
  currency: string;
  expiryDate?: string | null;
}
```

### Transaction

```typescript
interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "payment" | "transfer";
  title: string;
  date: string;
  amount: number;
  currency: string;
  accountId: string;
}
```

## Styling

The app uses Ionic's built-in CSS variables and custom CSS:

- Global styles: `src/theme/global.css`
- Ionic theme variables: `src/theme/variables.css`
- Page-specific styles: e.g., `src/pages/Home.css`

The app implements a dark mode by default, leveraging Ionic's theming system.

## Navigation

Navigation is handled through the Ionic Router (based on React Router):

- Tab-based navigation with bottom tab bar
- Stack navigation for drilling into specific screens

## Development Notes

### TypeScript

The project uses TypeScript for type safety. Declaration files are used to provide types for external libraries like ionicons.

### Component Structure

Each page is structured as a React functional component with hooks for state management.

### Mock Data

Currently using mock data for demonstration purposes. In a production app, these would be replaced by API calls to a backend service.

## Future Enhancements

Potential areas for expansion:

- Authentication system
- Real API integration
- Push notifications
- Biometric authentication
- Transaction analytics and insights
- Bill payment functionality
- Fund transfer between accounts

## Resources

- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
