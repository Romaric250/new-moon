import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface CropGrowthMonitoringScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  cropId: string;
}

const CropGrowthMonitoringScreen: React.FC<CropGrowthMonitoringScreenProps> = ({ 
  onNavigate, 
  onBack, 
  cropId 
}) => {
  const [selectedStage, setSelectedStage] = useState(0);

  // Mock crop data
  const cropData = {
    '1': { name: 'Maize', icon: '🌽', daysPlanted: 45 },
    '2': { name: 'Beans', icon: '🫘', daysPlanted: 30 },
    '3': { name: 'Rice', icon: '🌾', daysPlanted: 60 },
    '4': { name: 'Tomatoes', icon: '🍅', daysPlanted: 25 },
    '5': { name: 'Potatoes', icon: '🥔', daysPlanted: 40 },
    '6': { name: 'Cassava', icon: '🥔', daysPlanted: 90 },
    '7': { name: 'Peanuts', icon: '🥜', daysPlanted: 35 },
    '8': { name: 'Sweet Potatoes', icon: '🍠', daysPlanted: 50 },
  };

  const selectedCrop = cropData[cropId as keyof typeof cropData] || { name: 'Crop', icon: '🌱', daysPlanted: 0 };

  // Mock growth stages
  const growthStages = [
    {
      id: 1,
      name: 'Germination',
      duration: 7,
      description: 'Seed sprouts and develops roots',
      isCompleted: true,
      careInstructions: ['Keep soil moist', 'Maintain warm temperature'],
    },
    {
      id: 2,
      name: 'Vegetative Growth',
      duration: 21,
      description: 'Plant develops leaves and stems',
      isCompleted: true,
      careInstructions: ['Water regularly', 'Apply fertilizer'],
    },
    {
      id: 3,
      name: 'Flowering',
      duration: 14,
      description: 'Plant produces flowers',
      isCompleted: false,
      isCurrent: true,
      careInstructions: ['Reduce watering', 'Monitor for pests'],
    },
    {
      id: 4,
      name: 'Fruiting',
      duration: 28,
      description: 'Fruits develop and mature',
      isCompleted: false,
      careInstructions: ['Harvest when ready', 'Continue monitoring'],
    },
  ];

  const currentStage = growthStages.find(stage => stage.isCurrent) || growthStages[0];

  // Mock alerts
  const alerts = [
    {
      id: '1',
      type: 'reminder',
      title: 'Water your plants',
      message: 'Soil moisture is low. Water your maize plants today.',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Pest Alert',
      message: 'Monitor for aphids on your plants.',
      time: '1 day ago',
      isRead: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800">Crop Monitoring</Text>
            <Text className="text-gray-500">{selectedCrop.name} • Day {selectedCrop.daysPlanted}</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Current Stage */}
        <View className="bg-white mt-6 rounded-lg p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Current Growth Stage</Text>
          
          <View className="bg-green-50 rounded-lg p-4 border border-green-200">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-3">{selectedCrop.icon}</Text>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{currentStage.name}</Text>
                <Text className="text-gray-600">{currentStage.description}</Text>
              </View>
            </View>
            
            <View className="space-y-2">
              {currentStage.careInstructions.map((instruction, index) => (
                <View key={index} className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  <Text className="text-gray-700 ml-2">{instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Growth Timeline */}
        <View className="bg-white mt-4 rounded-lg p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Growth Timeline</Text>
          
          <View className="space-y-4">
            {growthStages.map((stage, index) => (
              <View key={stage.id} className="flex-row items-start">
                <View className="items-center mr-4">
                  <View className={`w-8 h-8 rounded-full items-center justify-center ${
                    stage.isCompleted 
                      ? 'bg-green-500' 
                      : stage.isCurrent 
                        ? 'bg-blue-500' 
                        : 'bg-gray-300'
                  }`}>
                    {stage.isCompleted ? (
                      <Ionicons name="checkmark" size={16} color="white" />
                    ) : stage.isCurrent ? (
                      <Text className="text-white font-bold text-xs">{index + 1}</Text>
                    ) : (
                      <Text className="text-gray-600 font-bold text-xs">{index + 1}</Text>
                    )}
                  </View>
                  {index < growthStages.length - 1 && (
                    <View className={`w-0.5 h-8 mt-2 ${
                      stage.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </View>
                
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className={`font-semibold ${
                      stage.isCurrent ? 'text-blue-600' : 'text-gray-800'
                    }`}>
                      {stage.name}
                    </Text>
                    <Text className="text-sm text-gray-500">{stage.duration} days</Text>
                  </View>
                  <Text className="text-gray-600 text-sm mb-2">{stage.description}</Text>
                  
                  {stage.isCurrent && (
                    <View className="bg-blue-50 rounded-lg p-3">
                      <Text className="text-blue-800 text-sm font-medium mb-2">Current Care:</Text>
                      {stage.careInstructions.map((instruction, idx) => (
                        <Text key={idx} className="text-blue-700 text-sm">• {instruction}</Text>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Alerts & Reminders */}
        <View className="bg-white mt-4 rounded-lg p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Alerts & Reminders</Text>
          
          {alerts.length > 0 ? (
            <View className="space-y-3">
              {alerts.map((alert) => (
                <View key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' 
                    ? 'bg-red-50 border-red-500' 
                    : 'bg-yellow-50 border-yellow-500'
                }`}>
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-800 mb-1">{alert.title}</Text>
                      <Text className="text-gray-600 text-sm mb-2">{alert.message}</Text>
                      <Text className="text-xs text-gray-500">{alert.time}</Text>
                    </View>
                    {!alert.isRead && (
                      <View className="w-3 h-3 bg-red-500 rounded-full" />
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center py-8">
              <Ionicons name="checkmark-circle" size={48} color={Colors.success} />
              <Text className="text-gray-500 mt-2">No alerts at the moment</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="mt-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
          
          <View className="flex-row space-x-3">
            <TouchableOpacity 
              className="flex-1 bg-blue-500 rounded-lg p-4 items-center"
              onPress={() => onNavigate('scanAnalyze', { cropId })}
            >
              <Ionicons name="bluetooth-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Re-scan Soil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 bg-green-500 rounded-lg p-4 items-center"
              onPress={() => onNavigate('lms')}
            >
              <Ionicons name="library-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Get Tips</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CropGrowthMonitoringScreen; 