import { Animated, Easing } from 'react-native';

// Animation configurations for consistent, smooth animations
export const AnimationConfig = {
  // Timing configurations
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
    entrance: 600,
  },
  
  // Easing functions for smooth, professional animations
  easing: {
    // Smooth entrance/exit
    smooth: Easing.bezier(0.25, 0.46, 0.45, 0.94),
    // Subtle bounce for interactive elements
    bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
    // Natural spring-like motion
    spring: Easing.bezier(0.175, 0.885, 0.32, 1.275),
    // Quick response for buttons
    quick: Easing.bezier(0.4, 0, 0.2, 1),
    // Gentle for form elements
    gentle: Easing.bezier(0.25, 0.1, 0.25, 1),
  },
  
  // Spring configurations
  spring: {
    gentle: { tension: 100, friction: 8 },
    bouncy: { tension: 150, friction: 6 },
    quick: { tension: 300, friction: 10 },
    smooth: { tension: 80, friction: 8 },
  },
};

// Pre-built animation functions
export const createEntranceAnimation = (
  fadeAnim: Animated.Value,
  slideAnim: Animated.Value,
  scaleAnim?: Animated.Value
) => {
  const animations = [
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: AnimationConfig.timing.entrance,
      easing: AnimationConfig.easing.smooth,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: AnimationConfig.timing.entrance,
      easing: AnimationConfig.easing.smooth,
      useNativeDriver: true,
    }),
  ];

  if (scaleAnim) {
    animations.push(
      Animated.spring(scaleAnim, {
        toValue: 1,
        ...AnimationConfig.spring.gentle,
        useNativeDriver: true,
      })
    );
  }

  return Animated.stagger(100, animations);
};

export const createExitAnimation = (
  fadeAnim: Animated.Value,
  slideAnim: Animated.Value,
  scaleAnim?: Animated.Value
) => {
  const animations = [
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: AnimationConfig.timing.normal,
      easing: AnimationConfig.easing.quick,
      useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
      toValue: 30,
      duration: AnimationConfig.timing.normal,
      easing: AnimationConfig.easing.quick,
      useNativeDriver: true,
    }),
  ];

  if (scaleAnim) {
    animations.push(
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: AnimationConfig.timing.normal,
        easing: AnimationConfig.easing.quick,
        useNativeDriver: true,
      })
    );
  }

  return Animated.parallel(animations);
};

export const createButtonPressAnimation = (scaleAnim: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      easing: AnimationConfig.easing.quick,
      useNativeDriver: true,
    }),
    Animated.spring(scaleAnim, {
      toValue: 1,
      ...AnimationConfig.spring.quick,
      useNativeDriver: true,
    }),
  ]);
};

export const createSuccessAnimation = (scaleAnim: Animated.Value) => {
  return Animated.spring(scaleAnim, {
    toValue: 1,
    ...AnimationConfig.spring.bouncy,
    useNativeDriver: true,
  });
};

export const createErrorShakeAnimation = (translateAnim: Animated.Value) => {
  return Animated.sequence([
    Animated.timing(translateAnim, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(translateAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
  ]);
};

export const createProgressAnimation = (
  progressAnim: Animated.Value,
  toValue: number
) => {
  return Animated.spring(progressAnim, {
    toValue,
    ...AnimationConfig.spring.smooth,
    useNativeDriver: false, // Required for width/height animations
  });
};

export const createFadeInAnimation = (
  fadeAnim: Animated.Value,
  delay: number = 0
) => {
  return Animated.timing(fadeAnim, {
    toValue: 1,
    duration: AnimationConfig.timing.normal,
    delay,
    easing: AnimationConfig.easing.gentle,
    useNativeDriver: true,
  });
};

export const createSlideUpAnimation = (
  slideAnim: Animated.Value,
  delay: number = 0
) => {
  return Animated.timing(slideAnim, {
    toValue: 0,
    duration: AnimationConfig.timing.normal,
    delay,
    easing: AnimationConfig.easing.smooth,
    useNativeDriver: true,
  });
};

// Staggered animations for lists or multiple elements
export const createStaggeredAnimation = (
  animations: Animated.CompositeAnimation[],
  staggerDelay: number = 100
) => {
  return Animated.stagger(staggerDelay, animations);
};

// Safe animation creators that avoid native driver conflicts
export const createSafeColorAnimation = (
  animValue: Animated.Value,
  toValue: number,
  duration: number = AnimationConfig.timing.normal
) => {
  return Animated.timing(animValue, {
    toValue,
    duration,
    easing: AnimationConfig.easing.smooth,
    useNativeDriver: false, // Required for color/border/width animations
  });
};

export const createSafeTransformAnimation = (
  animValue: Animated.Value,
  toValue: number,
  duration: number = AnimationConfig.timing.normal
) => {
  return Animated.timing(animValue, {
    toValue,
    duration,
    easing: AnimationConfig.easing.smooth,
    useNativeDriver: true, // Safe for transform/opacity animations
  });
};

// Responsive animation values based on screen size
export const getResponsiveAnimationValues = (screenWidth: number, screenHeight: number) => {
  const isLargeScreen = screenWidth > 400;
  const isTallScreen = screenHeight > 700;
  
  return {
    slideDistance: isLargeScreen ? 60 : 50,
    scaleFrom: isLargeScreen ? 0.85 : 0.9,
    staggerDelay: isLargeScreen ? 150 : 100,
    duration: {
      fast: isLargeScreen ? 250 : 200,
      normal: isLargeScreen ? 400 : 300,
      slow: isLargeScreen ? 600 : 500,
    },
    spacing: {
      small: isTallScreen ? 12 : 8,
      medium: isTallScreen ? 20 : 16,
      large: isTallScreen ? 32 : 24,
    },
  };
};
