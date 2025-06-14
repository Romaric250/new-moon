import React, { useState, useRef } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { BaseComponentProps } from '../types';
import {
  getResponsiveStyles,
  AnimationConfig,
  createErrorShakeAnimation,
  iconSize,
  fontSize,
  borderRadius,
  spacing
} from '../utils';

interface InputProps extends BaseComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Enhanced animation values
  const animatedValue = useRef(new Animated.Value(0)).current;
  const errorAnimatedValue = useRef(new Animated.Value(0)).current;
  const shakeAnimatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnimatedValue = useRef(new Animated.Value(1)).current;

  const responsiveStyles = getResponsiveStyles();

  const handleFocus = () => {
    setIsFocused(true);
    // Separate animations to avoid native driver conflicts
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: AnimationConfig.timing.normal,
      easing: AnimationConfig.easing.smooth,
      useNativeDriver: false, // Must be false for color/border animations
    }).start();

    Animated.spring(scaleAnimatedValue, {
      toValue: 1.02,
      ...AnimationConfig.spring.gentle,
      useNativeDriver: true, // Can be true for transform animations
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Separate animations to avoid native driver conflicts
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: AnimationConfig.timing.normal,
      easing: AnimationConfig.easing.smooth,
      useNativeDriver: false, // Must be false for color/border animations
    }).start();

    Animated.spring(scaleAnimatedValue, {
      toValue: 1,
      ...AnimationConfig.spring.gentle,
      useNativeDriver: true, // Can be true for transform animations
    }).start();
  };

  React.useEffect(() => {
    if (error) {
      // Show error animation
      Animated.timing(errorAnimatedValue, {
        toValue: 1,
        duration: AnimationConfig.timing.normal,
        easing: AnimationConfig.easing.smooth,
        useNativeDriver: true,
      }).start();

      // Shake animation separately
      createErrorShakeAnimation(shakeAnimatedValue).start();
    } else {
      Animated.timing(errorAnimatedValue, {
        toValue: 0,
        duration: AnimationConfig.timing.fast,
        easing: AnimationConfig.easing.quick,
        useNativeDriver: true,
      }).start();
    }
  }, [error]);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.beige, Colors.primary],
  });

  const labelColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.darkBeige, Colors.primary],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor,
            transform: [
              { scale: scaleAnimatedValue },
              { translateX: shakeAnimatedValue }
            ],
          }
        ]}
      >
        <Animated.Text style={[styles.label, { color: labelColor }]}>
          {label}
        </Animated.Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              responsiveStyles.input,
              disabled && styles.disabledInput,
              error && styles.errorInput,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={Colors.darkBeige}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            testID={testID}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.6}
            >
              {isPasswordVisible ? (
                <EyeOff size={iconSize.md} color={Colors.darkBeige} />
              ) : (
                <Eye size={iconSize.md} color={Colors.darkBeige} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {error && (
        <Animated.View
          style={[
            styles.errorContainer,
            {
              opacity: errorAnimatedValue,
              transform: [
                {
                  translateY: errorAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: Colors.cream,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm + 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: fontSize.lg,
    color: '#111827',
    paddingVertical: 4,
    minHeight: 24,
  },
  disabledInput: {
    opacity: 0.6,
  },
  errorInput: {
    color: '#EF4444',
  },
  eyeIcon: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  errorContainer: {
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: '#EF4444',
    fontWeight: '500',
  },
});
