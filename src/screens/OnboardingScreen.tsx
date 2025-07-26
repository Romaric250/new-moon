import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../constants/colors';

interface OnboardingScreenProps {
  onComplete: () => void;
  onLogin: () => void;
}

const { width } = Dimensions.get('window');

const onboardingSlides = [
  {
    id: 1,
    title: 'Welcome to SAMS',
    subtitle: 'Smart Agricultural Monitoring System',
    description: 'Get real-time insights into your soil and environmental conditions to make informed farming decisions.',
    icon: '🌱',
    color: Colors.primary,
  },
  {
    id: 2,
    title: 'Real-Time Soil Monitoring',
    subtitle: 'Monitor Your Soil Health',
    description: 'Track soil temperature, humidity, pH levels, and moisture content in real-time using our IoT sensors.',
    icon: '📊',
    color: Colors.info,
  },
  {
    id: 3,
    title: 'Smart Planting Suggestions',
    subtitle: 'AI-Powered Recommendations',
    description: 'Get intelligent suggestions for when and how to plant based on your soil conditions and weather forecasts.',
    icon: '🤖',
    color: Colors.success,
  },
  {
    id: 4,
    title: 'Learn Farming Techniques',
    subtitle: 'Educational Content',
    description: 'Access our Learning Management System with guides, videos, and best practices for modern farming.',
    icon: '📚',
    color: Colors.warning,
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete, onLogin }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleLogin = () => {
    onLogin();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center p-6 pt-12">
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-gray-500 font-medium">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(slideIndex);
        }}
        className="flex-1"
      >
        {onboardingSlides.map((slide, index) => (
          <View key={slide.id} className="flex-1 items-center justify-center px-8" style={{ width }}>
            {/* Icon */}
            <View 
              className="w-32 h-32 rounded-full items-center justify-center mb-8"
              style={{ backgroundColor: slide.color + '20' }}
            >
              <Text className="text-6xl">{slide.icon}</Text>
            </View>

            {/* Title */}
            <Text className="text-3xl font-bold text-gray-800 text-center mb-2">
              {slide.title}
            </Text>

            {/* Subtitle */}
            <Text className="text-lg text-gray-600 text-center mb-6">
              {slide.subtitle}
            </Text>

            {/* Description */}
            <Text className="text-base text-gray-500 text-center leading-6 px-4">
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center py-6">
        {onboardingSlides.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentSlide ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      {/* Bottom Buttons */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-green-500 py-4 rounded-lg items-center mb-4"
        >
          <Text className="text-white font-semibold text-lg">
            {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-gray-500 text-center font-medium">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;


