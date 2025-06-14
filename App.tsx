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
import { LearnScreen } from './src/screens/LearnScreen';
import { CourseDetailsScreen } from './src/screens/CourseDetailsScreen';
import { CourseModulesScreen } from './src/screens/CourseModulesScreen';
import { RoadmapScreen } from './src/screens/RoadmapScreen';
import { LessonDetailsScreen } from './src/screens/LessonDetailsScreen';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { AssignmentsScreen } from './src/screens/AssignmentsScreen';
import { AssignmentDetailsScreen } from './src/screens/AssignmentDetailsScreen';
import { SubmitAssignmentScreen } from './src/screens/SubmitAssignmentScreen';
import { StepDetailsScreen } from './src/screens/StepDetailsScreen';
import { SubmittedAssignmentsScreen } from './src/screens/SubmittedAssignmentsScreen';
import { EventDetailsScreen } from './src/screens/EventDetailsScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

type Screen =
  | 'onboarding'
  | 'enterCode'
  | 'createAccount'
  | 'login'
  | 'forgotPassword'
  | 'resetPassword'
  | 'home'
  | 'learn'
  | 'courseDetails'
  | 'courseModules'
  | 'roadmap'
  | 'lessonDetails'
  | 'calendar'
  | 'assignments'
  | 'assignmentDetails'
  | 'submitAssignment'
  | 'submittedAssignments'
  | 'stepDetails'
  | 'eventDetails'
  | 'notifications'
  | 'events'
  | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [resetToken, setResetToken] = useState('');
  const [navigationParams, setNavigationParams] = useState<any>(null);

  const navigateToScreen = (screen: Screen, params?: any) => {
    if (params?.token) setResetToken(params.token);
    setNavigationParams(params);
    setCurrentScreen(screen);
  };

  const handleNavigation = (screen: string, params?: any) => {
    navigateToScreen(screen as Screen, params);
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
        return <HomeScreen onNavigate={handleNavigation} />;

      case 'learn':
        return <LearnScreen onNavigate={handleNavigation} />;

      case 'courseDetails':
        return (
          <CourseDetailsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('learn')}
            course={navigationParams?.course}
          />
        );

      case 'courseModules':
        return (
          <CourseModulesScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('courseDetails', navigationParams)}
            course={navigationParams?.course}
          />
        );

      case 'roadmap':
        return (
          <RoadmapScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'lessonDetails':
        return (
          <LessonDetailsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('courseModules', navigationParams)}
            lesson={navigationParams?.lesson}
          />
        );

      case 'calendar':
        return (
          <CalendarScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'assignments':
        return (
          <AssignmentsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('home')}
          />
        );

      case 'assignmentDetails':
        return (
          <AssignmentDetailsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('assignments')}
            assignment={navigationParams?.assignment}
          />
        );

      case 'submitAssignment':
        return (
          <SubmitAssignmentScreen
            onNavigate={handleNavigation}
            onClose={() => navigateToScreen('assignmentDetails', navigationParams)}
            assignment={navigationParams?.assignment}
          />
        );

      case 'submittedAssignments':
        return (
          <SubmittedAssignmentsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('assignments')}
          />
        );

      case 'stepDetails':
        return (
          <StepDetailsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('roadmap')}
            step={navigationParams?.step}
          />
        );

      case 'eventDetails':
        return (
          <EventDetailsScreen
            onNavigate={handleNavigation}
            onBack={() => navigateToScreen('calendar')}
            event={navigationParams?.event}
          />
        );

      case 'events':
        return (
          <EventsScreen
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

      case 'notifications':
        // Placeholder screen - redirect to home for now
        return <HomeScreen onNavigate={handleNavigation} />;

      default:
        return <OnboardingScreen onNext={() => navigateToScreen('enterCode')} onLogin={() => navigateToScreen('login')} />;
    }
  };

  return (
    <>
      {renderScreen()}
      <StatusBar style="auto" />
    </>
  );
}
