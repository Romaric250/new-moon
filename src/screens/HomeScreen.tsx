import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  // Mock data - in real app, this would come from API/state
  const soilData = {
    temperature: 24,
    humidity: 65,
    pH: 6.8,
    moisture: 72,
    status: 'optimal' as const,
  };

  const weatherData = {
    temperature: 26,
    condition: 'sunny' as const,
    humidity: 60,
  };

  const getSoilStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return Colors.soil.optimal;
      case 'good': return Colors.soil.good;
      case 'moderate': return Colors.soil.moderate;
      case 'poor': return Colors.soil.poor;
      default: return Colors.soil.critical;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">SAMS</Text>
              <Text className="text-gray-500">Smart Agricultural Monitoring</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate('notifications')}>
              <Ionicons name="notifications-outline" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Current Soil Condition */}
        <View className="bg-white mx-6 mt-6 rounded-lg p-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">Current Soil Condition</Text>
            <View 
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: getSoilStatusColor(soilData.status) + '20' }}
            >
              <Text 
                className="text-sm font-medium"
                style={{ color: getSoilStatusColor(soilData.status) }}
              >
                {soilData.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">{soilData.temperature}°C</Text>
              <Text className="text-sm text-gray-500">Temperature</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">{soilData.humidity}%</Text>
              <Text className="text-sm text-gray-500">Humidity</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">{soilData.pH}</Text>
              <Text className="text-sm text-gray-500">pH Level</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">{soilData.moisture}%</Text>
              <Text className="text-sm text-gray-500">Moisture</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-6 mt-4">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
          
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity 
              className="flex-1 bg-green-500 rounded-lg p-4 mr-2 items-center"
              onPress={() => onNavigate('cropSelection')}
            >
              <Ionicons name="leaf-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Select Crop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-blue-500 rounded-lg p-4 ml-2 items-center"
              onPress={() => onNavigate('scanAnalyze', { cropId: 'demo' })}
            >
              <Ionicons name="bluetooth-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Insert Device & Scan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View className="bg-white mx-6 mt-4 mb-6 rounded-lg p-4 shadow-sm">
          <View className="flex-row justify-around">
            <TouchableOpacity className="items-center">
              <Ionicons name="home" size={24} color={Colors.primary} />
              <Text className="text-xs text-gray-500 mt-1">Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center"
              onPress={() => onNavigate('lms')}
            >
              <Ionicons name="library-outline" size={24} color={Colors.text.secondary} />
              <Text className="text-xs text-gray-500 mt-1">Learn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="items-center"
              onPress={() => onNavigate('profile')}
            >
              <Ionicons name="person-outline" size={24} color={Colors.text.secondary} />
              <Text className="text-xs text-gray-500 mt-1">Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;


