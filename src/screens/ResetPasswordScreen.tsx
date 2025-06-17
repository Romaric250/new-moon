import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface ResetPasswordScreenProps {
  onBack: () => void;
  onResetPassword: (password: string) => void;
  token: string;
}

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
    <SafeAreaView className="flex-1 bg-neutral-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 px-6 py-4"
        >
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4 shadow-md"
              onPress={onBack}
              activeOpacity={0.6}
            >
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-900">Reset Password</Text>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingTop: 24, paddingBottom: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Text className="text-2xl font-bold text-gray-900 mb-3 leading-8">Create new password</Text>

            <Text className="text-base text-gray-600 leading-6 mb-8">
              Your new password must be different from previously used passwords
            </Text>

            <View className="gap-3">
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

              {/* Password Strength Indicator */}
              {formData.password.length > 0 && (
                <View className="flex-row items-center mt-3 mb-4 px-1">
                  <View className="flex-1 h-1.5 bg-gray-200 rounded-full mr-4 overflow-hidden shadow-sm">
                    <View
                      style={{
                        width: `${getPasswordStrength(formData.password) * 100}%`,
                        backgroundColor: getStrengthColor(),
                      }}
                      className="h-full rounded-full shadow-sm"
                    />
                  </View>
                  <Text
                    style={{ color: getStrengthColor() }}
                    className="text-sm font-semibold min-w-[50px] text-right"
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
          <View className="pb-8 pt-4 px-1">
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


