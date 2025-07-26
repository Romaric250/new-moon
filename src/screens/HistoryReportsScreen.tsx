import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface HistoryReportsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const HistoryReportsScreen: React.FC<HistoryReportsScreenProps> = ({ onNavigate, onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock history data
  const scanHistory = [
    {
      id: '1',
      cropName: 'Maize',
      cropIcon: '🌽',
      date: '2024-01-15',
      soilHealth: 'optimal',
      canPlant: true,
      temperature: 24,
      humidity: 65,
      pH: 6.8,
      moisture: 72,
    },
    {
      id: '2',
      cropName: 'Beans',
      cropIcon: '🫘',
      date: '2024-01-10',
      soilHealth: 'good',
      canPlant: true,
      temperature: 22,
      humidity: 70,
      pH: 6.5,
      moisture: 68,
    },
    {
      id: '3',
      cropName: 'Tomatoes',
      cropIcon: '🍅',
      date: '2024-01-05',
      soilHealth: 'moderate',
      canPlant: false,
      temperature: 18,
      humidity: 55,
      pH: 5.2,
      moisture: 45,
    },
    {
      id: '4',
      cropName: 'Rice',
      cropIcon: '🌾',
      date: '2023-12-28',
      soilHealth: 'optimal',
      canPlant: true,
      temperature: 26,
      humidity: 75,
      pH: 7.0,
      moisture: 80,
    },
  ];

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'optimal', name: 'Optimal' },
    { id: 'good', name: 'Good' },
    { id: 'moderate', name: 'Moderate' },
    { id: 'poor', name: 'Poor' },
  ];

  const filteredHistory = selectedFilter === 'all' 
    ? scanHistory 
    : scanHistory.filter(scan => scan.soilHealth === selectedFilter);

  const getSoilHealthColor = (health: string) => {
    switch (health) {
      case 'optimal': return Colors.soil.optimal;
      case 'good': return Colors.soil.good;
      case 'moderate': return Colors.soil.moderate;
      case 'poor': return Colors.soil.poor;
      default: return Colors.soil.critical;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
      onPress={() => onNavigate('resultRecommendation', { 
        soilData: {
          temperature: item.temperature,
          humidity: item.humidity,
          pH: item.pH,
          moisture: item.moisture,
          timestamp: item.date,
        },
        cropId: '1' // Mock crop ID
      })}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-3">{item.cropIcon}</Text>
          <View>
            <Text className="text-lg font-semibold text-gray-800">{item.cropName}</Text>
            <Text className="text-sm text-gray-500">{formatDate(item.date)}</Text>
          </View>
        </View>
        
        <View className="items-end">
          <View 
            className="px-3 py-1 rounded-full mb-1"
            style={{ backgroundColor: getSoilHealthColor(item.soilHealth) + '20' }}
          >
            <Text 
              className="text-xs font-medium capitalize"
              style={{ color: getSoilHealthColor(item.soilHealth) }}
            >
              {item.soilHealth}
            </Text>
          </View>
          <View className={`w-3 h-3 rounded-full ${
            item.canPlant ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </View>
      </View>

      <View className="flex-row justify-between">
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">{item.temperature}°C</Text>
          <Text className="text-xs text-gray-500">Temp</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">{item.humidity}%</Text>
          <Text className="text-xs text-gray-500">Humidity</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">{item.pH}</Text>
          <Text className="text-xs text-gray-500">pH</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-gray-800">{item.moisture}%</Text>
          <Text className="text-xs text-gray-500">Moisture</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleExportReport = () => {
    // In real app, this would generate and export a PDF report
    console.log('Exporting report...');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onBack} className="mr-4">
              <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800">History & Reports</Text>
          </View>
          <TouchableOpacity onPress={handleExportReport}>
            <Ionicons name="download-outline" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Summary Stats */}
        <View className="bg-white mt-6 rounded-lg p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Summary</Text>
          
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">{scanHistory.length}</Text>
              <Text className="text-sm text-gray-500">Total Scans</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">
                {scanHistory.filter(scan => scan.canPlant).length}
              </Text>
              <Text className="text-sm text-gray-500">Plantable</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">
                {scanHistory.filter(scan => scan.soilHealth === 'optimal').length}
              </Text>
              <Text className="text-sm text-gray-500">Optimal</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-orange-600">
                {Math.round(scanHistory.reduce((acc, scan) => acc + scan.temperature, 0) / scanHistory.length)}
              </Text>
              <Text className="text-sm text-gray-500">Avg Temp</Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View className="mt-4 mb-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Filter by Soil Health</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFilter === filter.id 
                      ? 'bg-green-500 border-green-500' 
                      : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text className={`font-medium ${
                    selectedFilter === filter.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {filter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* History List */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Scan History</Text>
          
          {filteredHistory.length > 0 ? (
            <FlatList
              data={filteredHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View className="bg-white rounded-lg p-8 items-center">
              <Ionicons name="document-outline" size={48} color={Colors.text.tertiary} />
              <Text className="text-gray-500 text-center mt-4">
                No scans found for the selected filter
              </Text>
            </View>
          )}
        </View>

        {/* Export Options */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Export Reports</Text>
          
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg">
              <Ionicons name="document-text-outline" size={24} color={Colors.info} />
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-800">Monthly Report</Text>
                <Text className="text-sm text-gray-500">Export all scans from this month</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg">
              <Ionicons name="analytics-outline" size={24} color={Colors.success} />
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-800">Crop Analysis</Text>
                <Text className="text-sm text-gray-500">Detailed analysis for specific crops</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center p-4 bg-gray-50 rounded-lg">
              <Ionicons name="trending-up-outline" size={24} color={Colors.warning} />
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-800">Trend Report</Text>
                <Text className="text-sm text-gray-500">Soil health trends over time</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryReportsScreen; 