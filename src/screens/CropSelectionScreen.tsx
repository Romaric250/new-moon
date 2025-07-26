import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, FlatList } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface CropSelectionScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

interface Crop {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  season: string;
  growthTime: string;
}

const CropSelectionScreen: React.FC<CropSelectionScreenProps> = ({ onNavigate, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Crops', icon: '🌾' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'tubers', name: 'Tubers', icon: '🥔' },
  ];

  const crops: Crop[] = [
    { id: '1', name: 'Maize', icon: '🌽', category: 'grains', description: 'Staple grain crop', season: 'Rainy', growthTime: '3-4 months' },
    { id: '2', name: 'Rice', icon: '🍚', category: 'grains', description: 'Paddy rice cultivation', season: 'Wet', growthTime: '4-5 months' },
    { id: '3', name: 'Tomatoes', icon: '🍅', category: 'vegetables', description: 'Popular vegetable crop', season: 'All year', growthTime: '2-3 months' },
    { id: '4', name: 'Cassava', icon: '🥔', category: 'tubers', description: 'Root crop staple', season: 'All year', growthTime: '8-12 months' },
    { id: '5', name: 'Beans', icon: '🫘', category: 'vegetables', description: 'Legume crop', season: 'Rainy', growthTime: '2-3 months' },
    { id: '6', name: 'Bananas', icon: '🍌', category: 'fruits', description: 'Tropical fruit crop', season: 'All year', growthTime: '9-12 months' },
  ];

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCropSelect = (crop: Crop) => {
    onNavigate('scanAnalyze', { cropId: crop.id, cropName: crop.name });
  };

  const renderCropCard = ({ item }: { item: Crop }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => handleCropSelect(item)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <View className="w-16 h-16 bg-green-50 rounded-xl items-center justify-center mr-4">
          <Text className="text-3xl">{item.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">{item.name}</Text>
          <Text className="text-sm text-gray-600 mb-2">{item.description}</Text>
          <View className="flex-row items-center">
            <View className="bg-blue-50 px-2 py-1 rounded-full mr-2">
              <Text className="text-xs text-blue-600 font-medium">{item.season}</Text>
            </View>
            <View className="bg-orange-50 px-2 py-1 rounded-full">
              <Text className="text-xs text-orange-600 font-medium">{item.growthTime}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={onBack} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Select Crop</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="mb-6">
          <View className="relative">
            <TextInput
              className="bg-white rounded-xl px-4 py-3 pl-12 text-gray-800 border border-gray-200"
              placeholder="Search crops..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
            <Ionicons 
              name="search" 
              size={20} 
              color="#9CA3AF" 
              style={{ position: 'absolute', left: 16, top: 12 }}
            />
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`mr-3 px-4 py-3 rounded-xl border ${
                  selectedCategory === category.id
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white border-gray-200'
                }`}
                onPress={() => setSelectedCategory(category.id)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <Text className="text-lg mr-2">{category.icon}</Text>
                  <Text
                    className={`font-medium ${
                      selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Crops List */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Available Crops ({filteredCrops.length})
          </Text>
          <FlatList
            data={filteredCrops}
            renderItem={renderCropCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CropSelectionScreen; 