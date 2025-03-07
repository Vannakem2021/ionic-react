import React, { useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonToggle,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/react'
import {
  personOutline,
  cardOutline,
  lockClosedOutline,
  notificationsOutline,
  moonOutline,
  helpCircleOutline,
  logOutOutline,
  arrowBack,
  settingsOutline,
  walletOutline,
  shieldCheckmarkOutline,
  chatbubbleOutline
} from 'ionicons/icons'
import './Account.css'

const Account: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true)
  
  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://i.pravatar.cc/300',
    totalBalance: 12450.75
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    // Apply dark mode to the document
    document.body.classList.toggle('dark', newDarkMode)
  }

  // Format currency for display
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="icon-only" icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Profile Section */}
        <div className="profile-container">
          <IonAvatar className="profile-avatar">
            <img src={userData.profileImage} alt="Profile" />
          </IonAvatar>
          <h2 className="profile-name">{userData.name}</h2>
          <p className="profile-email">{userData.email}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">4</div>
              <div className="stat-label">Cards</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">6</div>
              <div className="stat-label">Banks</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">$12.4k</div>
              <div className="stat-label">Balance</div>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="settings-section">
          <h3 className="settings-title">Settings</h3>
          
          <div className="settings-list">
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={personOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Personal Information</div>
                <div className="settings-description">Manage your personal details</div>
              </div>
              <div className="settings-arrow">
                <IonIcon icon={arrowBack} className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={walletOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Payment Methods</div>
                <div className="settings-description">Manage your cards and accounts</div>
              </div>
              <div className="settings-arrow">
                <IonIcon icon={arrowBack} className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={shieldCheckmarkOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Security</div>
                <div className="settings-description">Password and authentication</div>
              </div>
              <div className="settings-arrow">
                <IonIcon icon={arrowBack} className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={notificationsOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Notifications</div>
                <div className="settings-description">Manage your alerts</div>
              </div>
              <div className="settings-arrow">
                <IonIcon icon={arrowBack} className="arrow-icon" />
              </div>
            </div>
            
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={moonOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Dark Mode</div>
                <div className="settings-description">Toggle app theme</div>
              </div>
              <IonToggle 
                checked={darkMode} 
                onIonChange={toggleDarkMode}
                className="settings-toggle"
              />
            </div>
            
            <div className="settings-item">
              <div className="settings-icon-container">
                <IonIcon icon={chatbubbleOutline} className="settings-icon" />
              </div>
              <div className="settings-content">
                <div className="settings-label">Help & Support</div>
                <div className="settings-description">Get assistance</div>
              </div>
              <div className="settings-arrow">
                <IonIcon icon={arrowBack} className="arrow-icon" />
              </div>
            </div>
          </div>
          
          <div className="logout-button-container">
            <button className="logout-button">
              <IonIcon icon={logOutOutline} className="logout-icon" />
              Logout
            </button>
          </div>
          
          <div className="app-version">
            Version 1.0.0
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Account
