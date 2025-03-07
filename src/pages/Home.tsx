import React, { useState, useRef, useEffect } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons,
  IonSearchbar
} from '@ionic/react'
import {
  personOutline,
  swapHorizontalOutline,
  documentTextOutline,
  cashOutline,
  walletOutline,
  ellipsisHorizontalOutline,
  chevronForwardOutline,
  chevronBackOutline,
  arrowBack,
  calendarOutline,
  trainOutline,
  ticketOutline,
  storefront,
  phonePortrait
} from 'ionicons/icons'
import { Account, bankingService } from '../services/BankingService'
import './Home.css'

// Mock data for accounts
const mockAccounts: Account[] = [
  {
    id: '1',
    type: 'visa',
    name: 'Bankie Visa',
    accountNumber: '**** **** **** 5812',
    balance: 821.99,
    currency: 'USD',
    expiryDate: '07/23'
  },
  {
    id: '2',
    type: 'mastercard',
    name: 'Bankie Mastercard',
    accountNumber: '**** **** **** 4217',
    balance: 1245.43,
    currency: 'USD',
    expiryDate: '11/25'
  },
  {
    id: '3',
    type: 'savings',
    name: 'Savings Account',
    accountNumber: '**** **** **** 9876',
    balance: 15000.00,
    currency: 'USD',
    expiryDate: null
  }
]

// Mock transactions data
const mockTransactions = [
  {
    id: '1',
    name: 'Alfa-Bank',
    date: 'April 28',
    amount: -216.00,
    category: 'Transfer',
    icon: swapHorizontalOutline
  },
  {
    id: '2',
    name: 'Tickets',
    date: 'April 25',
    amount: -115.00,
    category: 'Travel',
    icon: ticketOutline
  },
  {
    id: '3',
    name: 'Apple Store Paris',
    date: 'April 21',
    amount: -2599.00,
    category: 'Electronics',
    icon: phonePortrait
  },
  {
    id: '4',
    name: 'Troika',
    date: 'April 9',
    amount: -3.00,
    category: 'Transport',
    icon: trainOutline
  }
]

// Banking services data
const bankingServices = [
  {
    id: 1,
    icon: personOutline,
    title: 'Account',
    description: 'View account details and statements'
  },
  {
    id: 2,
    icon: swapHorizontalOutline,
    title: 'Fund Transfer',
    description: 'Transfer money between accounts'
  },
  {
    id: 3,
    icon: documentTextOutline,
    title: 'Statement',
    description: 'Download account statements'
  },
  {
    id: 4,
    icon: walletOutline,
    title: 'Loans',
    description: 'Apply for personal and home loans'
  },
  {
    id: 5,
    icon: cashOutline,
    title: 'Deposits',
    description: 'Create fixed and recurring deposits'
  },
  {
    id: 6,
    icon: ellipsisHorizontalOutline,
    title: 'More',
    description: 'Explore additional services'
  }
]

const Home: React.FC = () => {
  const [showBalance, setShowBalance] = useState<{[key: string]: boolean}>({
    '1': true,
    '2': false,
    '3': false
  })
  const [activeCard, setActiveCard] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Calculate card width based on container width
  const getCardWidth = () => {
    if (!carouselRef.current) return 0
    return carouselRef.current.offsetWidth * 0.8 + 15 // 80% width + 15px margin
  }

  const toggleBalance = (accountId: string) => {
    setShowBalance(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }))
  }

  const formatAccountNumber = (accountNumber: string) => {
    return accountNumber
  }

  // Format date for display
  const formatDate = (date: string) => {
    return date
  }

  // Format currency for transactions
  const formatCurrency = (amount: number) => {
    return amount < 0 
      ? `−$${Math.abs(amount).toFixed(2)}`
      : `$${amount.toFixed(2)}`
  }

  // Handle carousel scroll and update active card
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && !isTransitioning) {
        const scrollPosition = carouselRef.current.scrollLeft
        const cardWidth = getCardWidth()
        const newActiveCard = Math.round(scrollPosition / cardWidth)
        
        if (newActiveCard >= 0 && newActiveCard < mockAccounts.length && newActiveCard !== activeCard) {
          setActiveCard(newActiveCard)
        }
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll)
      return () => carousel.removeEventListener('scroll', handleScroll)
    }
  }, [activeCard, isTransitioning])

  // Snap to nearest card when scrolling ends
  useEffect(() => {
    const handleScrollEnd = () => {
      if (carouselRef.current && !isDragging) {
        const cardWidth = getCardWidth()
        const currentScroll = carouselRef.current.scrollLeft
        const targetCard = Math.round(currentScroll / cardWidth)
        
        if (targetCard >= 0 && targetCard < mockAccounts.length) {
          setIsTransitioning(true)
          scrollToCard(targetCard)
          
          // Reset transitioning state after animation completes
          setTimeout(() => {
            setIsTransitioning(false)
          }, 300) // Match with CSS transition duration
        }
      }
    }

    const carousel = carouselRef.current
    if (carousel) {
      carousel.addEventListener('scrollend', handleScrollEnd)
      carousel.addEventListener('touchend', handleScrollEnd)
      return () => {
        carousel.removeEventListener('scrollend', handleScrollEnd)
        carousel.removeEventListener('touchend', handleScrollEnd)
      }
    }
  }, [isDragging])

  // Scroll to a specific card
  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = getCardWidth()
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      })
      setActiveCard(index)
    }
  }

  // Handle dot indicator click
  const handleDotClick = (index: number) => {
    setIsTransitioning(true)
    scrollToCard(index)
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Match with CSS transition duration
  }

  // Mouse and touch event handlers for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
    
    // Prevent default behavior
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current || e.touches.length !== 1) return
    
    setIsDragging(true)
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return
    
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Adjusted scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
    
    // Prevent default behavior
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current || e.touches.length !== 1) return
    
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 1.5 // Adjusted scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk
    
    // Prevent default behavior that may interfere with custom scrolling
    e.preventDefault()
  }

  // Handle button clicks without triggering drag
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" defaultHref="/tabs/dashboard" />
          </IonButtons>
          <IonTitle>
            {mockAccounts[activeCard].name}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={calendarOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Current Balance */}
        <div className="current-balance">
          <div className="balance-label">
            {formatDate('April 2018')}
          </div>
          <div className="balance-amount-large">
            ${mockAccounts[activeCard].balance.toFixed(2)}
          </div>
        </div>

        {/* Account Cards */}
        <div 
          className="account-cards-container" 
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {mockAccounts.map((account, index) => (
            <IonCard key={account.id} className="account-card">
              {/* Contactless icon */}
              <div className="contactless-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="white" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M8.46,14.45L7.1,13.83C8.22,11.85 10.26,10.45 12.53,10.45C13.76,10.45 14.93,10.78 15.93,11.36L15.12,12.95C14.38,12.5 13.47,12.25 12.53,12.25C10.89,12.25 9.43,13.18 8.46,14.45M6.64,12.91L5.5,12.36C7.06,9.89 9.65,8.25 12.53,8.25C14.19,8.25 15.77,8.76 17.14,9.71L16.33,11.29C15.22,10.54 13.91,10.15 12.53,10.15C10.29,10.15 8.27,11.19 6.64,12.91M5.41,11.12L4.5,10.69C6.5,7.73 9.4,5.85 12.53,5.85C14.55,5.85 16.5,6.5 18.13,7.73L17.31,9.31C15.93,8.28 14.26,7.75 12.53,7.75C10.03,7.75 7.7,9.07 5.41,11.12Z" />
                </svg>
              </div>
              
              <IonCardHeader>
                <IonCardSubtitle>{account.name}</IonCardSubtitle>
                <IonCardTitle className="account-number">
                  {formatAccountNumber(account.accountNumber)}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {account.expiryDate && (
                  <div className="expiry-date">
                    <div className="expiry-label">Expiry</div>
                    <div className="expiry-value">{account.expiryDate}</div>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Carousel Indicator */}
        <div className="carousel-indicator">
          {mockAccounts.map((_, index) => (
            <div 
              key={index} 
              className={`indicator-dot ${index === activeCard ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {/* Banking Services Section */}
        <div className="banking-services-section">
          <div className="section-title">Banking Services</div>
          <div className="services-grid">
            {bankingServices.map(service => (
              <div key={service.id} className="service-item">
                <div className="service-icon-container">
                  <IonIcon icon={service.icon} className="service-icon" />
                </div>
                <div className="service-title">{service.title}</div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
