// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTPVerification: { email: string; type: 'register' | 'reset' };
  Home: undefined;
  CropSelection: undefined;
  ScanAnalyze: { cropId: string };
  ResultRecommendation: { soilData: SoilData; cropId: string };
  CropGrowthMonitoring: { cropId: string };
  HistoryReports: undefined;
  LMS: undefined;
  Notifications: undefined;
  Profile: undefined;
};

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: 'farmer' | 'expert' | 'admin';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Soil monitoring types
export interface SoilData {
  id: string;
  temperature: number; // in Celsius
  humidity: number; // percentage
  pH: number; // pH level
  moisture: number; // percentage
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Crop types
export interface Crop {
  id: string;
  name: string;
  category: 'legumes' | 'cereals' | 'vegetables' | 'fruits' | 'tubers';
  icon: string;
  optimalConditions: {
    temperature: {
      min: number;
      max: number;
    };
    pH: {
      min: number;
      max: number;
    };
    humidity: {
      min: number;
      max: number;
    };
  };
  growthStages: CropGrowthStage[];
  plantingSeason: {
    start: string; // month
    end: string; // month
  };
}

export interface CropGrowthStage {
  id: string;
  name: string;
  duration: number; // in days
  description: string;
  careInstructions: string[];
}

// IoT Device types
export interface IoTDevice {
  id: string;
  name: string;
  macAddress: string;
  isConnected: boolean;
  batteryLevel: number;
  lastSeen: string;
}

// Analysis Result types
export interface AnalysisResult {
  canPlant: boolean;
  confidence: number; // 0-100
  recommendations: Recommendation[];
  soilHealth: 'optimal' | 'good' | 'moderate' | 'poor' | 'critical';
  nextSteps: string[];
}

export interface Recommendation {
  id: string;
  type: 'soil_adjustment' | 'timing' | 'care' | 'warning';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

// Weather types
export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  temperature: number;
  condition: string;
  precipitation: number;
}

// LMS types
export interface LMSModule {
  id: string;
  title: string;
  category: 'soil_care' | 'seed_saving' | 'manure_use' | 'crop_rotation';
  description: string;
  duration: number; // in minutes
  content: LMSContent[];
  quiz?: Quiz;
  isCompleted: boolean;
  progress: number; // 0-100
}

export interface LMSContent {
  id: string;
  type: 'text' | 'video' | 'image' | 'audio';
  title: string;
  content: string;
  mediaUrl?: string;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Notification types
export interface Notification {
  id: string;
  type: 'reminder' | 'alert' | 'lms' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: {
    screen: string;
    params?: any;
  };
}

// History types
export interface ScanRecord {
  id: string;
  cropId: string;
  soilData: SoilData;
  analysisResult: AnalysisResult;
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
  };
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
