export const Colors = {
  // Primary colors - SAMS Theme
  primary: '#4CAF50', // Verdant Green
  white: '#FFFFFF',
  
  // Neutral colors
  background: '#FFFFFF',
  surface: '#F8F9FA',
  card: '#FFFFFF',
  
  // Text colors
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Soil monitoring colors
  soil: {
    optimal: '#4CAF50',
    good: '#8BC34A',
    moderate: '#FFC107',
    poor: '#FF5722',
    critical: '#F44336',
  },
  
  // Weather colors
  weather: {
    sunny: '#FFB300',
    cloudy: '#90A4AE',
    rainy: '#42A5F5',
    stormy: '#5C6BC0',
  },
} as const;

export type ColorKey = keyof typeof Colors;
