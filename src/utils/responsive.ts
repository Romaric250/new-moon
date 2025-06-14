import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Screen size breakpoints
export const Breakpoints = {
  small: 320,
  medium: 375,
  large: 414,
  xlarge: 480,
} as const;

export const ScreenSizes = {
  isSmall: SCREEN_WIDTH <= Breakpoints.small,
  isMedium: SCREEN_WIDTH > Breakpoints.small && SCREEN_WIDTH <= Breakpoints.medium,
  isLarge: SCREEN_WIDTH > Breakpoints.medium && SCREEN_WIDTH <= Breakpoints.large,
  isXLarge: SCREEN_WIDTH > Breakpoints.large,
  isTall: SCREEN_HEIGHT > 700,
  isShort: SCREEN_HEIGHT <= 600,
} as const;

// Responsive scaling functions
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone X width as base
  return (SCREEN_WIDTH / baseWidth) * size;
};

export const verticalScale = (size: number): number => {
  const baseHeight = 812; // iPhone X height as base
  return (SCREEN_HEIGHT / baseHeight) * size;
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Font scaling with accessibility support
export const scaledFont = (size: number): number => {
  const newSize = moderateScale(size, 0.3);
  return Math.max(newSize, size * 0.85); // Minimum 85% of original size
};

// Responsive spacing
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
} as const;

// Responsive padding/margin
export const getResponsivePadding = () => ({
  horizontal: ScreenSizes.isSmall ? spacing.md : spacing.lg,
  vertical: ScreenSizes.isShort ? spacing.md : spacing.lg,
  top: ScreenSizes.isShort ? spacing.md : spacing.xl,
  bottom: ScreenSizes.isShort ? spacing.lg : spacing.xxl,
});

// Responsive font sizes
export const fontSize = {
  xs: scaledFont(10),
  sm: scaledFont(12),
  md: scaledFont(14),
  lg: scaledFont(16),
  xl: scaledFont(18),
  xxl: scaledFont(20),
  title: scaledFont(24),
  heading: scaledFont(28),
  display: scaledFont(32),
} as const;

// Responsive border radius
export const borderRadius = {
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
  round: scale(50),
} as const;

// Responsive icon sizes
export const iconSize = {
  xs: scale(12),
  sm: scale(16),
  md: scale(20),
  lg: scale(24),
  xl: scale(28),
  xxl: scale(32),
} as const;

// Responsive button heights
export const buttonHeight = {
  sm: verticalScale(36),
  md: verticalScale(44),
  lg: verticalScale(52),
  xl: verticalScale(60),
} as const;

// Responsive input heights
export const inputHeight = {
  sm: verticalScale(40),
  md: verticalScale(48),
  lg: verticalScale(56),
} as const;

// Get responsive styles based on screen size
export const getResponsiveStyles = () => {
  const padding = getResponsivePadding();
  
  return {
    container: {
      paddingHorizontal: padding.horizontal,
      paddingVertical: padding.vertical,
    },
    header: {
      marginBottom: ScreenSizes.isTall ? spacing.xl : spacing.lg,
    },
    title: {
      fontSize: ScreenSizes.isLarge ? fontSize.heading : fontSize.title,
      lineHeight: ScreenSizes.isLarge ? fontSize.heading * 1.3 : fontSize.title * 1.3,
      marginBottom: ScreenSizes.isTall ? spacing.md : spacing.sm,
    },
    subtitle: {
      fontSize: ScreenSizes.isLarge ? fontSize.xl : fontSize.lg,
      lineHeight: ScreenSizes.isLarge ? fontSize.xl * 1.4 : fontSize.lg * 1.4,
      marginBottom: ScreenSizes.isTall ? spacing.xl : spacing.lg,
    },
    description: {
      fontSize: ScreenSizes.isLarge ? fontSize.lg : fontSize.md,
      lineHeight: ScreenSizes.isLarge ? fontSize.lg * 1.5 : fontSize.md * 1.5,
      marginBottom: ScreenSizes.isTall ? spacing.xl : spacing.lg,
    },
    input: {
      height: ScreenSizes.isLarge ? inputHeight.lg : inputHeight.md,
      fontSize: fontSize.lg,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.md,
    },
    button: {
      height: ScreenSizes.isLarge ? buttonHeight.lg : buttonHeight.md,
      borderRadius: borderRadius.lg,
      marginBottom: padding.bottom,
    },
    icon: {
      size: ScreenSizes.isLarge ? iconSize.lg : iconSize.md,
    },
    spacing: {
      section: ScreenSizes.isTall ? spacing.xxl : spacing.xl,
      element: ScreenSizes.isTall ? spacing.lg : spacing.md,
      small: ScreenSizes.isTall ? spacing.md : spacing.sm,
    },
  };
};

// Animation values based on screen size
export const getResponsiveAnimationConfig = () => ({
  slideDistance: ScreenSizes.isLarge ? 60 : 50,
  scaleFrom: ScreenSizes.isLarge ? 0.85 : 0.9,
  staggerDelay: ScreenSizes.isLarge ? 150 : 100,
  duration: {
    fast: ScreenSizes.isLarge ? 250 : 200,
    normal: ScreenSizes.isLarge ? 400 : 300,
    slow: ScreenSizes.isLarge ? 600 : 500,
  },
});

// Utility to check if device has notch/safe area
export const hasNotch = (): boolean => {
  const pixelRatio = PixelRatio.get();
  const screenData = {
    height: SCREEN_HEIGHT * pixelRatio,
    width: SCREEN_WIDTH * pixelRatio,
  };
  
  // iPhone X and newer detection
  return (
    (screenData.height === 2436 && screenData.width === 1125) || // iPhone X, XS
    (screenData.height === 2688 && screenData.width === 1242) || // iPhone XS Max
    (screenData.height === 1792 && screenData.width === 828) ||  // iPhone XR
    (screenData.height === 2340 && screenData.width === 1080) || // iPhone 12 mini
    (screenData.height === 2532 && screenData.width === 1170) || // iPhone 12, 12 Pro
    (screenData.height === 2778 && screenData.width === 1284)    // iPhone 12 Pro Max
  );
};

// Export screen dimensions for convenience
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isLandscape: SCREEN_WIDTH > SCREEN_HEIGHT,
  isPortrait: SCREEN_HEIGHT > SCREEN_WIDTH,
  aspectRatio: SCREEN_WIDTH / SCREEN_HEIGHT,
};
