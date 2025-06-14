export const Colors = {
  // Primary colors
  primary: '#F2BD24',
  
  // Neutral colors
  white: '#FFFFFF',
  cream: '#FCFAF7',
  lightBeige: '#F5F0E8',
  beige: '#E8E0CF',
  darkBeige: '#9C874A',
  brown: '#8C8059',
  lightCream: '#F2F0E8',
  offWhite: '#FAFAFA',
  warmCream: '#F0EDD6',
  
  // Semantic colors
  background: '#FFFFFF',
  surface: '#FCFAF7',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },
  
  // Status colors (for future use)
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export type ColorKey = keyof typeof Colors;
