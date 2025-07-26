import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface ResultRecommendationScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  soilData?: any;
  cropId?: string;
}

const ResultRecommendationScreen: React.FC<ResultRecommendationScreenProps> = ({ 
  onNavigate, 
  onBack, 
  soilData, 
  cropId 
}) => {
  const [selectedTab, setSelectedTab] = useState<'analysis' | 'recommendations' | 'actions'>('analysis');

  // Mock data - in real app this would come from props
  const mockSoilData = soilData || {
    temperature: 24.5,
    humidity: 68,
    pH: 6.8,
    moisture: 72,
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    organicMatter: 3.2,
  };

  const recommendations = [
    {
      id: '1',
      type: 'fertilizer',
      title: 'Nitrogen Boost Needed',
      description: 'Soil nitrogen levels are below optimal. Apply 20kg/ha of NPK 20-10-10 fertilizer.',
      priority: 'high',
      icon: 'leaf',
      color: '#10B981',
    },
    {
      id: '2',
      type: 'irrigation',
      title: 'Optimal Moisture Level',
      description: 'Current moisture content is ideal for maize growth. Maintain current irrigation schedule.',
      priority: 'medium',
      icon: 'water',
      color: '#3B82F6',
    },
    {
      id: '3',
      type: 'ph',
      title: 'pH Level Optimal',
      description: 'Soil pH of 6.8 is perfect for maize cultivation. No pH adjustment needed.',
      priority: 'low',
      icon: 'flask',
      color: '#8B5CF6',
    },
  ];

  const actions = [
    {
      id: '1',
      title: 'Apply Fertilizer',
      description: 'NPK 20-10-10',
      icon: 'leaf',
      color: '#10B981',
      time: 'Within 3 days',
    },
    {
      id: '2',
      title: 'Schedule Irrigation',
      description: 'Maintain 70% moisture',
      icon: 'water',
      color: '#3B82F6',
      time: 'Next 2 weeks',
    },
    {
      id: '3',
      title: 'Monitor Growth',
      description: 'Weekly check-ups',
      icon: 'eye',
      color: '#F59E0B',
      time: 'Ongoing',
    },
  ];

  const getSoilHealthScore = () => {
    const scores = {
      temperature: mockSoilData.temperature >= 20 && mockSoilData.temperature <= 30 ? 100 : 70,
      humidity: mockSoilData.humidity >= 60 && mockSoilData.humidity <= 80 ? 100 : 80,
      pH: mockSoilData.pH >= 6.0 && mockSoilData.pH <= 7.5 ? 100 : 60,
      moisture: mockSoilData.moisture >= 65 && mockSoilData.moisture <= 75 ? 100 : 85,
    };
    
    return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 4);
  };

  const renderAnalysisTab = () => (
    <View>
      {/* Soil Health Score */}
      <View className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
        <Text className="text-lg font-bold text-gray-800 mb-4">Soil Health Score</Text>
        <View className="items-center">
          <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-green-600">{getSoilHealthScore()}</Text>
            <Text className="text-sm text-green-600">/100</Text>
          </View>
          <Text className="text-lg font-semibold text-gray-800 mb-2">Excellent</Text>
          <Text className="text-sm text-gray-600 text-center">Your soil is in great condition for maize cultivation</Text>
        </View>
      </View>

      {/* Detailed Analysis */}
      <View className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
        <Text className="text-lg font-bold text-gray-800 mb-4">Detailed Analysis</Text>
        
        <View className="space-y-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-50 rounded-lg items-center justify-center mr-3">
                <Ionicons name="thermometer" size={20} color="#EF4444" />
              </View>
              <Text className="text-gray-700">Temperature</Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-gray-800">{mockSoilData.temperature}°C</Text>
              <Text className="text-xs text-green-600">Optimal</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-50 rounded-lg items-center justify-center mr-3">
                <Ionicons name="water" size={20} color="#3B82F6" />
              </View>
              <Text className="text-gray-700">Humidity</Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-gray-800">{mockSoilData.humidity}%</Text>
              <Text className="text-xs text-green-600">Good</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-purple-50 rounded-lg items-center justify-center mr-3">
                <Ionicons name="flask" size={20} color="#8B5CF6" />
              </View>
              <Text className="text-gray-700">pH Level</Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-gray-800">{mockSoilData.pH}</Text>
              <Text className="text-xs text-green-600">Perfect</Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-50 rounded-lg items-center justify-center mr-3">
                <Ionicons name="leaf" size={20} color="#10B981" />
              </View>
              <Text className="text-gray-700">Moisture</Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-gray-800">{mockSoilData.moisture}%</Text>
              <Text className="text-xs text-green-600">Optimal</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRecommendationsTab = () => (
    <View>
      {recommendations.map((rec) => (
        <View key={rec.id} className="bg-white rounded-2xl p-6 mb-4 border border-gray-100">
          <View className="flex-row items-start">
            <View 
              className="w-12 h-12 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: `${rec.color}20` }}
            >
              <Ionicons name={rec.icon as any} size={24} color={rec.color} />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg font-bold text-gray-800 mr-2">{rec.title}</Text>
                <View 
                  className={`px-2 py-1 rounded-full ${
                    rec.priority === 'high' ? 'bg-red-100' : 
                    rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}
                >
                  <Text 
                    className={`text-xs font-medium ${
                      rec.priority === 'high' ? 'text-red-600' : 
                      rec.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}
                  >
                    {rec.priority.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-600 leading-5">{rec.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderActionsTab = () => (
    <View>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          className="bg-white rounded-2xl p-6 mb-4 border border-gray-100"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View 
                className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: `${action.color}20` }}
              >
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800 mb-1">{action.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{action.description}</Text>
                <Text className="text-xs text-gray-500">{action.time}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Results & Recommendations</Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Tab Navigation */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row bg-gray-100 rounded-xl p-1">
          {[
            { id: 'analysis', label: 'Analysis', icon: 'analytics' },
            { id: 'recommendations', label: 'Recommendations', icon: 'bulb' },
            { id: 'actions', label: 'Actions', icon: 'checkmark-circle' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              className={`flex-1 flex-row items-center justify-center py-3 px-4 rounded-lg ${
                selectedTab === tab.id ? 'bg-white shadow-sm' : ''
              }`}
              onPress={() => setSelectedTab(tab.id as any)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={16} 
                color={selectedTab === tab.id ? '#10B981' : '#6B7280'} 
                className="mr-2"
              />
              <Text 
                className={`text-sm font-medium ${
                  selectedTab === tab.id ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {selectedTab === 'analysis' && renderAnalysisTab()}
        {selectedTab === 'recommendations' && renderRecommendationsTab()}
        {selectedTab === 'actions' && renderActionsTab()}

        {/* Action Buttons */}
        <View className="mb-6 mt-4">
          <TouchableOpacity
            className="bg-green-500 rounded-2xl py-4 px-6 mb-4"
            onPress={() => onNavigate('cropGrowthMonitoring', { cropId })}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="leaf" size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg font-bold ml-2">Start Monitoring</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-blue-500 rounded-2xl py-4 px-6"
            onPress={() => onNavigate('historyReports')}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="document-text" size={24} color="white" className="mr-2" />
              <Text className="text-white text-lg font-bold ml-2">Save Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultRecommendationScreen; 