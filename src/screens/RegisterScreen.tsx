import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface RegisterScreenProps {
  onBack: () => void;
  onRegister: (data: { name: string; email: string; password: string; userType: string }) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userTypes = [
    { id: 'farmer', name: 'Farmer', icon: '👨‍🌾' },
    { id: 'expert', name: 'Agricultural Expert', icon: '👨‍🔬' },
    { id: 'admin', name: 'Administrator', icon: '👨‍💼' },
  ];

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    onRegister({ name, email, password, userType });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4">
        <TouchableOpacity onPress={onBack} className="mb-6">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl">🌱</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">Create Account</Text>
          <Text className="text-gray-500 text-center">Join SAMS to start smart farming</Text>
        </View>
      </View>

      {/* Registration Form */}
      <ScrollView className="flex-1 px-6">
        <View className="space-y-4">
          {/* Name Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <Ionicons name="person-outline" size={20} color={Colors.text.secondary} />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <Ionicons name="mail-outline" size={20} color={Colors.text.secondary} />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <Ionicons name="lock-closed-outline" size={20} color={Colors.text.secondary} />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={Colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Confirm Password</Text>
            <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <Ionicons name="lock-closed-outline" size={20} color={Colors.text.secondary} />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={Colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* User Type Selection */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">I am a:</Text>
            <View className="space-y-2">
              {userTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  className={`flex-row items-center p-4 rounded-lg border ${
                    userType === type.id 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onPress={() => setUserType(type.id)}
                >
                  <Text className="text-2xl mr-3">{type.icon}</Text>
                  <Text className={`flex-1 text-base font-medium ${
                    userType === type.id ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {type.name}
                  </Text>
                  {userType === type.id && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="flex-row items-start mt-4">
            <TouchableOpacity className="mt-1">
              <View className="w-5 h-5 border-2 border-gray-300 rounded mr-3" />
            </TouchableOpacity>
            <Text className="text-sm text-gray-600 flex-1">
              I agree to the{' '}
              <Text className="text-green-500 font-medium">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-green-500 font-medium">Privacy Policy</Text>
            </Text>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            className="bg-green-500 py-4 rounded-lg items-center mt-6"
            onPress={handleRegister}
          >
            <Text className="text-white font-semibold text-lg">Create Account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="items-center py-4">
            <Text className="text-gray-500">Already have an account? </Text>
            <TouchableOpacity onPress={onBack}>
              <Text className="text-green-500 font-semibold">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen; 