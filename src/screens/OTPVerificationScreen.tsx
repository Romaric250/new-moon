import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface OTPVerificationScreenProps {
  onBack: () => void;
  onVerify: (otp: string) => void;
  email: string;
  type: 'register' | 'reset';
}

const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({ 
  onBack, 
  onVerify, 
  email, 
  type 
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit code');
      return;
    }
    onVerify(otpString);
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    // In real app, this would trigger resend OTP API call
    Alert.alert('Success', 'New verification code sent to your email');
  };

  const formatEmail = (email: string) => {
    const [username, domain] = email.split('@');
    return `${username.substring(0, 3)}***@${domain}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4">
        <TouchableOpacity onPress={onBack} className="mb-6">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
            <Ionicons name="mail-check" size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</Text>
          <Text className="text-gray-500 text-center">
            {type === 'register' 
              ? 'We sent a verification code to your email' 
              : 'Enter the code sent to reset your password'
            }
          </Text>
        </View>
      </View>

      {/* Email Display */}
      <View className="px-6 mb-6">
        <View className="bg-gray-50 rounded-lg p-4 items-center">
          <Text className="text-gray-600 text-sm mb-1">Code sent to:</Text>
          <Text className="text-gray-800 font-semibold">{formatEmail(email)}</Text>
        </View>
      </View>

      {/* OTP Input */}
      <View className="px-6 mb-8">
        <Text className="text-sm font-medium text-gray-700 mb-4 text-center">
          Enter 4-digit verification code
        </Text>
        
        <View className="flex-row justify-between">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              className="w-16 h-16 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold text-gray-800"
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>
      </View>

      {/* Verify Button */}
      <View className="px-6 mb-6">
        <TouchableOpacity
          className={`py-4 rounded-lg items-center ${
            otp.join('').length === 4 ? 'bg-green-500' : 'bg-gray-300'
          }`}
          onPress={handleVerify}
          disabled={otp.join('').length !== 4}
        >
          <Text className="text-white font-semibold text-lg">
            {type === 'register' ? 'Verify & Create Account' : 'Reset Password'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Resend Code */}
      <View className="px-6 items-center">
        <Text className="text-gray-500 text-center mb-2">
          Didn't receive the code?
        </Text>
        
        {canResend ? (
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-green-500 font-semibold">Resend Code</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-gray-400">
            Resend code in {timer}s
          </Text>
        )}
      </View>

      {/* Help Text */}
      <View className="flex-1 px-6 justify-end pb-6">
        <View className="bg-blue-50 rounded-lg p-4">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color={Colors.info} />
            <Text className="text-sm text-gray-600 ml-2 flex-1">
              Check your email inbox and spam folder. The code expires in 10 minutes.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPVerificationScreen; 