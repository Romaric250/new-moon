import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      {/* App Logo */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-4">
          <Text className="text-white text-4xl font-bold">🌱</Text>
        </View>
        <Text className="text-3xl font-bold text-gray-800 mb-2">SAMS</Text>
        <Text className="text-lg text-gray-600 text-center px-8">
          Smart Agricultural Monitoring System
        </Text>
      </View>

      {/* Tagline */}
      <Text className="text-gray-500 text-center px-8 mb-8">
        Empowering Smart Farming
      </Text>

      {/* Loading Animation */}
      <View className="items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text className="text-gray-400 mt-4">Loading...</Text>
      </View>
    </View>
  );
};

export default SplashScreen; 