import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface LMSScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const LMSScreen: React.FC<LMSScreenProps> = ({ onNavigate, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock LMS data
  const categories = [
    { id: 'soil_care', name: 'Soil Care', icon: '🌱', color: Colors.soil.optimal },
    { id: 'seed_saving', name: 'Seed Saving', icon: '🌾', color: Colors.warning },
    { id: 'manure_use', name: 'Manure Use', icon: '💩', color: Colors.info },
    { id: 'crop_rotation', name: 'Crop Rotation', icon: '🔄', color: Colors.success },
  ];

  const modules = [
    {
      id: '1',
      title: 'Understanding Soil pH',
      category: 'soil_care',
      description: 'Learn about soil acidity and alkalinity',
      duration: 15,
      progress: 100,
      isCompleted: true,
    },
    {
      id: '2',
      title: 'Organic Fertilizer Application',
      category: 'manure_use',
      description: 'Best practices for using organic fertilizers',
      duration: 20,
      progress: 60,
      isCompleted: false,
    },
    {
      id: '3',
      title: 'Seed Collection Techniques',
      category: 'seed_saving',
      description: 'How to collect and store seeds properly',
      duration: 25,
      progress: 0,
      isCompleted: false,
    },
    {
      id: '4',
      title: 'Crop Rotation Planning',
      category: 'crop_rotation',
      description: 'Plan effective crop rotation cycles',
      duration: 30,
      progress: 0,
      isCompleted: false,
    },
    {
      id: '5',
      title: 'Soil Moisture Management',
      category: 'soil_care',
      description: 'Maintain optimal soil moisture levels',
      duration: 18,
      progress: 0,
      isCompleted: false,
    },
  ];

  const filteredModules = selectedCategory 
    ? modules.filter(module => module.category === selectedCategory)
    : modules;

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.color || Colors.text.secondary;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return Colors.success;
    if (progress > 50) return Colors.warning;
    return Colors.text.tertiary;
  };

  const handleModulePress = (moduleId: string) => {
    // Navigate to module details/quiz
    console.log('Open module:', moduleId);
  };

  const renderModule = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
      onPress={() => handleModulePress(item.id)}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: getCategoryColor(item.category) + '20' }}
          >
            <Text className="text-lg">
              {categories.find(cat => cat.id === item.category)?.icon}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
            <Text className="text-sm text-gray-500">{item.description}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-500">{item.duration} min</Text>
          {item.isCompleted && (
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          )}
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-2">
        <View className="flex-row justify-between mb-1">
          <Text className="text-xs text-gray-500">Progress</Text>
          <Text className="text-xs font-semibold text-gray-800">{item.progress}%</Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2">
          <View 
            className="h-2 rounded-full"
            style={{ 
              width: `${item.progress}%`,
              backgroundColor: getProgressColor(item.progress)
            }}
          />
        </View>
      </View>

      {/* Category Tag */}
      <View className="flex-row justify-between items-center">
        <View 
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: getCategoryColor(item.category) + '20' }}
        >
          <Text 
            className="text-xs font-medium"
            style={{ color: getCategoryColor(item.category) }}
          >
            {categories.find(cat => cat.id === item.category)?.name}
          </Text>
        </View>
        {item.progress > 0 && !item.isCompleted && (
          <Text className="text-xs text-gray-500">Continue</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={onBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Learning Center</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Categories */}
        <View className="mt-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === null 
                    ? 'bg-green-500 border-green-500' 
                    : 'bg-white border-gray-300'
                }`}
                onPress={() => setSelectedCategory(null)}
              >
                <Text className={`font-medium ${
                  selectedCategory === null ? 'text-white' : 'text-gray-700'
                }`}>
                  All
                </Text>
              </TouchableOpacity>
              
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={`px-4 py-2 rounded-full border flex-row items-center ${
                    selectedCategory === category.id 
                      ? 'bg-green-500 border-green-500' 
                      : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text className="mr-1">{category.icon}</Text>
                  <Text className={`font-medium ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Progress Summary */}
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Your Progress</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">
                {modules.filter(m => m.isCompleted).length}
              </Text>
              <Text className="text-sm text-gray-500">Completed</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">
                {modules.length}
              </Text>
              <Text className="text-sm text-gray-500">Total</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">
                {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)}%
              </Text>
              <Text className="text-sm text-gray-500">Average</Text>
            </View>
          </View>
        </View>

        {/* Modules */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Learning Modules</Text>
          <FlatList
            data={filteredModules}
            renderItem={renderModule}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg p-4 items-center">
              <Ionicons name="book-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Take Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-green-500 rounded-lg p-4 items-center">
              <Ionicons name="download-outline" size={24} color="white" />
              <Text className="text-white font-semibold mt-2">Download</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LMSScreen; 