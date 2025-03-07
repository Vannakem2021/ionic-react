/**
 * Banking Service
 * Handles data operations for the banking app
 */

// Account interface
export interface Account {
  id: string
  type: 'savings' | 'current'
  name: string
  accountNumber: string
  balance: number
  currency: string
}

// Transaction interface
export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'payment' | 'transfer'
  title: string
  date: string
  amount: number
  currency: string
  accountId: string
}

// Mock data for accounts
const accounts: Account[] = [
  {
    id: '1',
    type: 'savings',
    name: 'Saving Account',
    accountNumber: '0014 1241 5574',
    balance: 8245.32,
    currency: 'USD'
  },
  {
    id: '2',
    type: 'current',
    name: 'Current Account',
    accountNumber: '2244 1298 3456',
    balance: 4205.43,
    currency: 'USD'
  }
]

// Mock data for transactions
const transactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    title: 'Salary Deposit',
    date: 'Mar 01, 2025',
    amount: 2450.00,
    currency: 'USD',
    accountId: '1'
  },
  {
    id: '2',
    type: 'withdrawal',
    title: 'ATM Withdrawal',
    date: 'Feb 28, 2025',
    amount: -200.00,
    currency: 'USD',
    accountId: '2'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Netflix Subscription',
    date: 'Feb 27, 2025',
    amount: -15.99,
    currency: 'USD',
    accountId: '2'
  },
  {
    id: '4',
    type: 'transfer',
    title: 'Transfer to John',
    date: 'Feb 25, 2025',
    amount: -150.00,
    currency: 'USD',
    accountId: '1'
  },
  {
    id: '5',
    type: 'deposit',
    title: 'Refund from Amazon',
    date: 'Feb 24, 2025',
    amount: 35.49,
    currency: 'USD',
    accountId: '2'
  },
  {
    id: '6',
    type: 'payment',
    title: 'Grocery Store',
    date: 'Feb 22, 2025',
    amount: -87.32,
    currency: 'USD',
    accountId: '1'
  }
]

// Banking service class
class BankingService {
  // Get all accounts
  getAccounts(): Account[] {
    return accounts
  }

  // Get account by ID
  getAccountById(id: string): Account | undefined {
    return accounts.find(account => account.id === id)
  }

  // Get total balance across all accounts
  getTotalBalance(): number {
    return accounts.reduce((sum, account) => sum + account.balance, 0)
  }

  // Get all transactions
  getTransactions(): Transaction[] {
    return transactions
  }

  // Get transactions by account ID
  getTransactionsByAccountId(accountId: string): Transaction[] {
    return transactions.filter(transaction => transaction.accountId === accountId)
  }

  // Format currency
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency
    })
  }
}

// Export a singleton instance
export const bankingService = new BankingService()
