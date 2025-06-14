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
  createSafeColorAnimation,
  createSafeTransformAnimation,
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

  // Simplified animation values to avoid conflicts
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const labelColorAnim = useRef(new Animated.Value(0)).current;
  const errorOpacityAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const responsiveStyles = getResponsiveStyles();

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelColorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.parallel([
      Animated.timing(borderColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(labelColorAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  React.useEffect(() => {
    if (error) {
      Animated.timing(errorOpacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Simple shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.timing(errorOpacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [error]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.beige, Colors.primary],
  });

  const labelColor = labelColorAnim.interpolate({
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
            transform: [{ translateX: shakeAnim }],
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
              opacity: errorOpacityAnim,
              transform: [
                {
                  translateY: errorOpacityAnim.interpolate({
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
