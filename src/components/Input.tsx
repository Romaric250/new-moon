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
  const animatedValue = useRef(new Animated.Value(0)).current;
  const errorAnimatedValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    if (error) {
      Animated.timing(errorAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorAnimatedValue, {
        toValue: 0,
        duration: 200,
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
      <Animated.View style={[styles.inputContainer, { borderColor }]}>
        <Animated.Text style={[styles.label, { color: labelColor }]}>
          {label}
        </Animated.Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
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
              activeOpacity={0.7}
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color={Colors.darkBeige} />
              ) : (
                <Eye size={20} color={Colors.darkBeige} />
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
    marginBottom: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Colors.cream,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 4,
  },
  disabledInput: {
    opacity: 0.6,
  },
  errorInput: {
    color: '#EF4444',
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    marginTop: 4,
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
  },
});
