import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { verifyInstallation } from 'nativewind';

export const NativeWindTest: React.FC = () => {
  // Verify NativeWind installation
  verifyInstallation();

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <View className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
          NativeWind Test
        </Text>
        
        <Text className="text-base text-gray-600 text-center mb-6 leading-6">
          If you can see this styled component, NativeWind is working correctly!
        </Text>

        {/* Primary Button */}
        <TouchableOpacity 
          className="bg-primary-500 rounded-xl py-4 px-6 mb-4 shadow-md active:bg-primary-600"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold text-center text-base">
            Primary Button
          </Text>
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity 
          className="bg-gray-200 rounded-xl py-4 px-6 mb-4 active:bg-gray-300"
          activeOpacity={0.8}
        >
          <Text className="text-gray-800 font-semibold text-center text-base">
            Secondary Button
          </Text>
        </TouchableOpacity>

        {/* Color Palette Test */}
        <View className="flex-row justify-between mt-4">
          <View className="w-12 h-12 bg-primary-500 rounded-lg" />
          <View className="w-12 h-12 bg-red-500 rounded-lg" />
          <View className="w-12 h-12 bg-blue-500 rounded-lg" />
          <View className="w-12 h-12 bg-green-500 rounded-lg" />
          <View className="w-12 h-12 bg-purple-500 rounded-lg" />
        </View>

        <Text className="text-xs text-gray-500 text-center mt-4">
          Color palette test with Tailwind classes
        </Text>
      </View>
    </View>
  );
};
