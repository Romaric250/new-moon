import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSendReset: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ 
  onBack, 
  onSendReset 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

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

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Success animation
      Animated.spring(successAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }).start();
      
      // Auto navigate after success
      setTimeout(() => {
        onSendReset(email);
      }, 2000);
    }, 1500);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) {
      setError('');
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
        <View className="mb-8">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 pt-6">
          <Text className="text-2xl font-bold text-gray-900 mb-4">Forgot password?</Text>

          <Text className="text-base text-gray-600 leading-6 mb-8">
            Enter the email associated with your account and we'll send an email
            with instructions to reset your password.
          </Text>

          <View className="mb-6">
            <Input
              label="Email"
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              error={error}
              disabled={isSuccess}
              testID="email-input"
            />
          </View>

          {/* Success Message */}
          {isSuccess && (
            <Animated.View
              style={{
                opacity: successAnim,
                transform: [
                  {
                    scale: successAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              }}
              className="bg-green-100 rounded-xl p-4 mb-4"
            >
              <Text className="text-sm text-green-800 font-medium text-center">
                ✓ Reset instructions sent to your email!
              </Text>
            </Animated.View>
          )}
        </View>

        {/* Submit Button */}
        <View className="pb-8">
          <Button
            title={isSuccess ? "Instructions Sent" : "Send reset instructions"}
            onPress={handleSubmit}
            variant={isSuccess ? "secondary" : "primary"}
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isSuccess}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};


