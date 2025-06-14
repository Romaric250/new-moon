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
    // Disabled animations to avoid conflicts
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Disabled animations to avoid conflicts
  };

  React.useEffect(() => {
    // Disabled error animations to avoid conflicts
  }, [error]);

  // Static colors to avoid animation conflicts
  const borderColor = isFocused ? Colors.primary : Colors.beige;
  const labelColor = isFocused ? Colors.primary : Colors.darkBeige;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
          }
        ]}
      >
        <Text style={[styles.label, { color: labelColor }]}>
          {label}
        </Text>
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
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
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
