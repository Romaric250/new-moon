import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ScrollView,
  Easing
} from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface CreateAccountScreenProps {
  onCreateAccount: (data: {
    name: string;
    email: string;
    password: string;
  }) => void;
}

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  onCreateAccount
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Simplified animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onCreateAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className="flex-1 px-6 py-4"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-2xl font-bold text-gray-900 flex-1">Create your account</Text>
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            activeOpacity={0.7}
          >
            <HelpCircle size={24} color="#9C874A" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Input
            label="Name"
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            placeholder="Enter your full name"
            error={errors.name}
            testID="name-input"
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            testID="email-input"
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            placeholder="Create a password"
            secureTextEntry
            autoCapitalize="none"
            error={errors.password}
            testID="password-input"
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            autoCapitalize="none"
            error={errors.confirmPassword}
            testID="confirm-password-input"
          />
        </ScrollView>

        {/* Submit Button */}
        <Animated.View
          style={{ transform: [{ scale: buttonScaleAnim }] }}
          className="pb-8 pt-4"
        >
          <Button
            title="Create Account"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
          />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};


