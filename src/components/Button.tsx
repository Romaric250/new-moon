import React, { useRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import { BaseComponentProps } from '../types';
import { Colors } from '../constants/colors';
import {
  getResponsiveStyles,
  createButtonPressAnimation,
  fontSize,
  borderRadius,
  spacing,
  buttonHeight
} from '../utils';

interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const responsiveStyles = getResponsiveStyles();

  const handlePress = () => {
    if (disabled || loading) return;

    createButtonPressAnimation(scaleAnim).start();
    onPress();
  };
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    // Add variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButton);
        break;
    }

    // Add size styles
    switch (size) {
      case 'sm':
        baseStyle.push(styles.smallButton);
        break;
      case 'md':
        baseStyle.push(styles.mediumButton);
        break;
      case 'lg':
        baseStyle.push(styles.largeButton);
        break;
    }

    // Add full width
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    // Add disabled/loading opacity
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];

    // Add variant text styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
    }

    // Add size text styles
    switch (size) {
      case 'sm':
        baseStyle.push(styles.smallText);
        break;
      case 'md':
        baseStyle.push(styles.mediumText);
        break;
      case 'lg':
        baseStyle.push(styles.largeText);
        break;
    }

    return baseStyle;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={handlePress}
        disabled={disabled || loading}
        testID={testID}
        activeOpacity={0.9}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? Colors.white : Colors.primary}
          />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Variant styles
  primaryButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.cream,
    borderColor: Colors.cream,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  // Size styles
  smallButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    minHeight: buttonHeight.sm,
  },
  mediumButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    minHeight: buttonHeight.md,
  },
  largeButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md + 4,
    borderRadius: borderRadius.lg,
    minHeight: buttonHeight.lg,
  },
  // Layout styles
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Variant text styles
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.brown,
  },
  outlineText: {
    color: Colors.primary,
  },
  // Size text styles
  smallText: {
    fontSize: fontSize.md,
  },
  mediumText: {
    fontSize: fontSize.lg,
  },
  largeText: {
    fontSize: fontSize.xl,
  },
});
