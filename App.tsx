import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  OnboardingScreen,
  HomeScreen,
  EnterCodeScreen,
  CreateAccountScreen,
  LoginScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen
} from './src/screens';

type Screen =
  | 'onboarding'
  | 'enterCode'
  | 'createAccount'
  | 'login'
  | 'forgotPassword'
  | 'resetPassword'
  | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [resetToken, setResetToken] = useState('');

  const navigateToScreen = (screen: Screen, token?: string) => {
    if (token) setResetToken(token);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return (
          <OnboardingScreen
            onNext={() => navigateToScreen('enterCode')}
            onLogin={() => navigateToScreen('login')}
          />
        );

      case 'enterCode':
        return (
          <EnterCodeScreen
            onClose={() => navigateToScreen('onboarding')}
            onSubmit={(code) => {
              console.log('Admission code:', code);
              navigateToScreen('createAccount');
            }}
          />
        );

      case 'createAccount':
        return (
          <CreateAccountScreen
            onCreateAccount={(data) => {
              console.log('Account created:', data);
              navigateToScreen('home');
            }}
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
            onForgotPassword={() => navigateToScreen('forgotPassword')}
          />
        );

      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            onBack={() => navigateToScreen('login')}
            onSendReset={(email) => {
              console.log('Reset email sent to:', email);
              navigateToScreen('resetPassword', 'demo-token-123');
            }}
          />
        );

      case 'resetPassword':
        return (
          <ResetPasswordScreen
            onBack={() => navigateToScreen('forgotPassword')}
            onResetPassword={(password) => {
              console.log('Password reset:', password);
              navigateToScreen('login');
            }}
            token={resetToken}
          />
        );

      case 'home':
        return <HomeScreen />;

      default:
        return <OnboardingScreen onNext={() => navigateToScreen('enterCode')} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
}
