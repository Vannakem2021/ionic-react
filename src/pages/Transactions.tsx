import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonText,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  arrowDownOutline,
  arrowUpOutline,
  cardOutline,
  swapHorizontalOutline,
  arrowBack,
  calendarOutline,
  trainOutline,
  ticketOutline,
  storefront,
  phonePortrait,
} from "ionicons/icons";
import { Transaction, bankingService } from "../services/BankingService";
import "./Transactions.css";

// Enhanced mock data for transactions with categories and icons
const mockTransactions = [
  {
    id: "1",
    type: "transfer",
    title: "Alfa-Bank",
    date: "April 28, 2025",
    amount: -216.0,
    currency: "USD",
    accountId: "1",
    category: "Transfer",
    icon: swapHorizontalOutline,
  },
  {
    id: "2",
    type: "payment",
    title: "Tickets",
    date: "April 25, 2025",
    amount: -115.0,
    currency: "USD",
    accountId: "2",
    category: "Travel",
    icon: ticketOutline,
  },
  {
    id: "3",
    type: "payment",
    title: "Apple Store Paris",
    date: "April 21, 2025",
    amount: -2599.0,
    currency: "USD",
    accountId: "1",
    category: "Electronics",
    icon: phonePortrait,
  },
  {
    id: "4",
    type: "payment",
    title: "Troika",
    date: "April 9, 2025",
    amount: -3.0,
    currency: "USD",
    accountId: "2",
    category: "Transport",
    icon: trainOutline,
  },
  {
    id: "5",
    type: "deposit",
    title: "Salary Deposit",
    date: "April 5, 2025",
    amount: 2450.0,
    currency: "USD",
    accountId: "1",
    category: "Income",
    icon: arrowDownOutline,
  },
  {
    id: "6",
    type: "payment",
    title: "Grocery Store",
    date: "April 2, 2025",
    amount: -87.32,
    currency: "USD",
    accountId: "1",
    category: "Shopping",
    icon: storefront,
  },
];

const Transactions: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [filteredTransactions, setFilteredTransactions] =
    useState(mockTransactions);

  useEffect(() => {
    // Filter transactions based on segment and search text
    let filtered = mockTransactions;

    // Filter by type
    if (selectedSegment !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === selectedSegment
      );
    }

    // Filter by search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (transaction) =>
          transaction.title.toLowerCase().includes(searchLower) ||
          transaction.date.toLowerCase().includes(searchLower) ||
          transaction.category.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTransactions(filtered);
  }, [selectedSegment, searchText]);

  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return amount < 0
      ? `−$${Math.abs(amount).toFixed(2)}`
      : `$${amount.toFixed(2)}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>Transactions</IonTitle>
          <IonButtons slot="end">
            <IonIcon slot="icon-only" icon={calendarOutline} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Search Bar */}
        <div className="search-container">
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Search transactions"
            className="transaction-search"
          />
        </div>

        {/* Segment Filter */}
        <IonSegment
          value={selectedSegment}
          onIonChange={(e) => setSelectedSegment(String(e.detail.value))}
          className="transaction-segment"
        >
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="deposit">
            <IonLabel>Income</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="payment">
            <IonLabel>Expenses</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="transfer">
            <IonLabel>Transfers</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Transaction List */}
        <div className="transaction-list-container">
          {filteredTransactions.length === 0 ? (
            <div className="no-transactions">
              <IonText color="medium">No transactions found</IonText>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="transaction-icon-container">
                    <IonIcon
                      icon={transaction.icon}
                      className="transaction-icon"
                    />
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.title}</div>
                    <div className="transaction-date">{transaction.date}</div>
                  </div>
                </div>
                <div>
                  <div
                    className={`transaction-amount ${
                      transaction.amount < 0
                        ? "amount-negative"
                        : "amount-positive"
                    }`}
                  >
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </div>
                  <div className="transaction-category">
                    {transaction.category}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
