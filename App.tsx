import './global.css';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import CropSelectionScreen from './src/screens/CropSelectionScreen';
import ScanAnalyzeScreen from './src/screens/ScanAnalyzeScreen';
import ResultRecommendationScreen from './src/screens/ResultRecommendationScreen';
import CropGrowthMonitoringScreen from './src/screens/CropGrowthMonitoringScreen';
import HistoryReportsScreen from './src/screens/HistoryReportsScreen';
import LMSScreen from './src/screens/LMSScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'otpVerification'
  | 'home'
  | 'cropSelection'
  | 'scanAnalyze'
  | 'resultRecommendation'
  | 'cropGrowthMonitoring'
  | 'historyReports'
  | 'lms'
  | 'notifications'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [navigationParams, setNavigationParams] = useState<any>(null);

  const navigateToScreen = (screen: Screen, params?: any) => {
    setNavigationParams(params);
    setCurrentScreen(screen);
  };

  const handleNavigation = (screen: string, params?: any) => {
    navigateToScreen(screen as Screen, params);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => navigateToScreen('onboarding')} />;

      case 'onboarding':
        return (
          <OnboardingScreen
            onComplete={() => navigateToScreen('login')}
            onLogin={() => navigateToScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onBack={() => navigateToScreen('onboarding')}
            onLogin={(email, password) => {
              console.log('Login:', { email, password });
              navigateToScreen('home');
            }}
            onRegister={() => navigateToScreen('register')}
          />
        );

      case 'register':
        return (
          <RegisterScreen
            onBack={() => navigateToScreen('login')}
            onRegister={(data) => {
              console.log('Register:', data);
              navigateToScreen('otpVerification', { email: data.email, type: 'register' });
            }}
          />
        );

      case 'otpVerification':
        return (
          <OTPVerificationScreen
            onBack={() => navigateToScreen('login')}
            onVerify={(otp) => {
              console.log('OTP verified:', otp);
              navigateToScreen('home');
            }}
            email={navigationParams?.email}
            type={navigationParams?.type}
          />
        );

      case 'home':
        return <HomeScreen onNavigate={handleNavigation} />;

      case 'cropSelection':
        return (
          <CropSelectionScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'scanAnalyze':
        return (
          <ScanAnalyzeScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('cropSelection')}
            cropId={navigationParams?.cropId}
          />
        );

      case 'resultRecommendation':
        return (
          <ResultRecommendationScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('scanAnalyze', navigationParams)}
            soilData={navigationParams?.soilData}
            cropId={navigationParams?.cropId}
          />
        );

      case 'cropGrowthMonitoring':
        return (
          <CropGrowthMonitoringScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
            cropId={navigationParams?.cropId}
          />
        );

      case 'historyReports':
        return (
          <HistoryReportsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'lms':
        return (
          <LMSScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      default:
        return <SplashScreen onComplete={() => navigateToScreen('onboarding')} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
}
