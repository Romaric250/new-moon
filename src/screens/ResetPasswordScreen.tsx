import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../constants/colors';
// Removed animation imports to avoid conflicts

interface ResetPasswordScreenProps {
  onBack: () => void;
  onResetPassword: (password: string) => void;
  token: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  onBack,
  onResetPassword,
  token
}) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Simplified animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Simplified entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Disabled animations to avoid conflicts
  useEffect(() => {
    // Static progress update without animation
  }, [formData.password]);

  const getPasswordStrength = (password: string): number => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 0.25;
    if (password.length < 8) return 0.5;
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 1;
    return 0.75;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Disabled button animation

    setIsLoading(true);

    // Simulate API call with realistic timing
    setTimeout(() => {
      setIsLoading(false);
      onResetPassword(formData.password);
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength(formData.password);
    if (strength <= 0.25) return '#EF4444';
    if (strength <= 0.5) return '#F59E0B';
    if (strength <= 0.75) return '#10B981';
    return '#059669';
  };

  const getStrengthText = () => {
    const strength = getPasswordStrength(formData.password);
    if (strength <= 0.25) return 'Weak';
    if (strength <= 0.5) return 'Fair';
    if (strength <= 0.75) return 'Good';
    return 'Strong';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.6}
            >
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.formContainer}
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Text style={styles.title}>Create new password</Text>

            <Text style={styles.description}>
              Your new password must be different from previously used passwords
            </Text>

            <View style={styles.inputsContainer}>
            <View>
              <Input
                label="New password"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                placeholder="Enter new password"
                secureTextEntry
                autoCapitalize="none"
                error={errors.password}
                testID="new-password-input"
              />
              
              {/* Simplified Password Strength Indicator */}
              {formData.password.length > 0 && (
                <View style={styles.strengthContainer}>
                  <View style={styles.strengthBar}>
                    <View
                      style={[
                        styles.strengthProgress,
                        {
                          width: `${getPasswordStrength(formData.password) * 100}%`,
                          backgroundColor: getStrengthColor(),
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.strengthText,
                      {
                        color: getStrengthColor(),
                      }
                    ]}
                  >
                    {getStrengthText()}
                  </Text>
                </View>
              )}
            </View>

            <Input
              label="Confirm password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              placeholder="Confirm new password"
              secureTextEntry
              autoCapitalize="none"
              error={errors.confirmPassword}
              testID="confirm-password-input"
            />
            </View>
          </ScrollView>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="Reset Password"
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: screenWidth > 400 ? 32 : 24,
    paddingVertical: screenHeight > 700 ? 24 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingTop: screenHeight > 700 ? 32 : 24,
    paddingBottom: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: screenWidth > 400 ? 28 : 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: screenHeight > 700 ? 12 : 8,
    lineHeight: screenWidth > 400 ? 36 : 32,
  },
  description: {
    fontSize: screenWidth > 400 ? 16 : 14,
    color: '#6B7280',
    lineHeight: screenWidth > 400 ? 24 : 20,
    marginBottom: screenHeight > 700 ? 40 : 32,
  },
  inputsContainer: {
    gap: screenHeight > 700 ? 12 : 8,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight > 700 ? 12 : 8,
    marginBottom: screenHeight > 700 ? 16 : 12,
    paddingHorizontal: 4,
  },
  strengthBar: {
    flex: 1,
    height: screenWidth > 400 ? 6 : 4,
    backgroundColor: '#E5E7EB',
    borderRadius: screenWidth > 400 ? 3 : 2,
    marginRight: screenWidth > 400 ? 16 : 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  strengthProgress: {
    height: '100%',
    borderRadius: screenWidth > 400 ? 3 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  strengthText: {
    fontSize: screenWidth > 400 ? 14 : 12,
    fontWeight: '600',
    minWidth: screenWidth > 400 ? 60 : 50,
    textAlign: 'right',
  },
  buttonContainer: {
    paddingBottom: screenHeight > 700 ? 40 : 32,
    paddingTop: 16,
    paddingHorizontal: 4,
  },
});
