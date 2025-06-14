// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  EnterCode: undefined;
  CreateAccount: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
  Home: undefined;
  // Add more screens as needed
};

// User types (for future authentication)
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Course types (for future e-learning features)
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  price: number;
  rating: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Common component props
export interface BaseComponentProps {
  className?: string;
  testID?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
