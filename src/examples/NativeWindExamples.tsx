import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft, Heart, Star, ShoppingCart } from 'lucide-react-native';

/**
 * NativeWind Examples for OpenDreams
 * 
 * This file demonstrates how to use NativeWind (Tailwind CSS) classes
 * in React Native components alongside the existing StyleSheet approach.
 */

interface NativeWindExamplesProps {
  onBack: () => void;
}

export const NativeWindExamples: React.FC<NativeWindExamplesProps> = ({ onBack }) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with NativeWind */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="p-2 -ml-2"
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">NativeWind Examples</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Layout Examples */}
        <View className="p-6">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Layout Examples</Text>
          
          {/* Flexbox Layout */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Flexbox Layout</Text>
            <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg">
              <Text className="text-base text-gray-700">Left</Text>
              <Text className="text-base text-gray-700">Center</Text>
              <Text className="text-base text-gray-700">Right</Text>
            </View>
          </View>

          {/* Grid-like Layout */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Grid-like Layout</Text>
            <View className="flex-row flex-wrap -mx-2">
              <View className="w-1/2 px-2 mb-4">
                <View className="bg-primary-500 p-4 rounded-lg">
                  <Text className="text-white font-medium">Card 1</Text>
                </View>
              </View>
              <View className="w-1/2 px-2 mb-4">
                <View className="bg-primary-500 p-4 rounded-lg">
                  <Text className="text-white font-medium">Card 2</Text>
                </View>
              </View>
              <View className="w-1/2 px-2 mb-4">
                <View className="bg-primary-500 p-4 rounded-lg">
                  <Text className="text-white font-medium">Card 3</Text>
                </View>
              </View>
              <View className="w-1/2 px-2 mb-4">
                <View className="bg-primary-500 p-4 rounded-lg">
                  <Text className="text-white font-medium">Card 4</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Typography Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Typography</Text>
            <Text className="text-3xl font-bold text-gray-900 mb-2">Heading 1</Text>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Heading 2</Text>
            <Text className="text-xl font-semibold text-gray-700 mb-2">Heading 3</Text>
            <Text className="text-base text-gray-600 mb-2">Body text with normal weight</Text>
            <Text className="text-sm text-gray-500 mb-2">Small text</Text>
            <Text className="text-xs text-gray-400">Extra small text</Text>
          </View>

          {/* Color Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Colors (Custom Theme)</Text>
            <View className="flex-row flex-wrap -mx-1">
              <View className="w-1/3 px-1 mb-2">
                <View className="bg-primary-500 h-16 rounded-lg justify-center items-center">
                  <Text className="text-white text-xs font-medium">Primary</Text>
                </View>
              </View>
              <View className="w-1/3 px-1 mb-2">
                <View className="bg-neutral-100 h-16 rounded-lg justify-center items-center">
                  <Text className="text-gray-700 text-xs font-medium">Neutral 100</Text>
                </View>
              </View>
              <View className="w-1/3 px-1 mb-2">
                <View className="bg-neutral-200 h-16 rounded-lg justify-center items-center">
                  <Text className="text-gray-700 text-xs font-medium">Neutral 200</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Button Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Buttons</Text>
            
            {/* Primary Button */}
            <TouchableOpacity className="bg-primary-500 py-3 px-6 rounded-lg mb-3 shadow-md">
              <Text className="text-white font-semibold text-center">Primary Button</Text>
            </TouchableOpacity>

            {/* Secondary Button */}
            <TouchableOpacity className="bg-gray-200 py-3 px-6 rounded-lg mb-3">
              <Text className="text-gray-800 font-semibold text-center">Secondary Button</Text>
            </TouchableOpacity>

            {/* Outline Button */}
            <TouchableOpacity className="border-2 border-primary-500 py-3 px-6 rounded-lg mb-3">
              <Text className="text-primary-500 font-semibold text-center">Outline Button</Text>
            </TouchableOpacity>

            {/* Button with Icon */}
            <TouchableOpacity className="bg-primary-500 py-3 px-6 rounded-lg flex-row items-center justify-center mb-3">
              <Heart size={20} color="white" />
              <Text className="text-white font-semibold ml-2">Button with Icon</Text>
            </TouchableOpacity>
          </View>

          {/* Card Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Cards</Text>
            
            {/* Simple Card */}
            <View className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">Simple Card</Text>
              <Text className="text-gray-600">This is a simple card with shadow and border.</Text>
            </View>

            {/* Card with Header */}
            <View className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden">
              <View className="bg-primary-500 p-4">
                <Text className="text-white font-semibold">Card Header</Text>
              </View>
              <View className="p-4">
                <Text className="text-gray-600">Card content goes here with a colored header.</Text>
              </View>
            </View>

            {/* Product Card */}
            <View className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden">
              <View className="bg-gray-100 h-32 justify-center items-center">
                <Text className="text-gray-500">Image Placeholder</Text>
              </View>
              <View className="p-4">
                <Text className="text-lg font-semibold text-gray-900 mb-1">Product Name</Text>
                <Text className="text-gray-600 mb-3">Product description here</Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl font-bold text-primary-500">$99</Text>
                  <TouchableOpacity className="bg-primary-500 p-2 rounded-full">
                    <ShoppingCart size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Spacing Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Spacing</Text>
            <View className="bg-gray-100 p-4 rounded-lg">
              <View className="bg-primary-500 p-2 mb-2 rounded">
                <Text className="text-white text-center">Margin Bottom 2 (mb-2)</Text>
              </View>
              <View className="bg-primary-500 p-4 mb-4 rounded">
                <Text className="text-white text-center">Padding 4, Margin Bottom 4 (p-4 mb-4)</Text>
              </View>
              <View className="bg-primary-500 px-6 py-2 rounded">
                <Text className="text-white text-center">Horizontal Padding 6, Vertical Padding 2 (px-6 py-2)</Text>
              </View>
            </View>
          </View>

          {/* Responsive Examples */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Responsive Design</Text>
            <Text className="text-gray-600 mb-4">
              NativeWind supports responsive design. You can use breakpoint prefixes like sm:, md:, lg:, xl:
            </Text>
            <View className="bg-primary-500 p-4 rounded-lg sm:bg-blue-500 md:bg-green-500">
              <Text className="text-white font-medium">
                This changes color based on screen size
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Common NativeWind Class Patterns for OpenDreams:
 * 
 * Layout:
 * - flex-1, flex-row, flex-col
 * - justify-center, justify-between, justify-around
 * - items-center, items-start, items-end
 * - w-full, h-full, w-1/2, h-32
 * 
 * Spacing:
 * - p-4, px-6, py-2, m-4, mx-auto, my-2
 * - space-x-4, space-y-2
 * 
 * Colors (Custom Theme):
 * - bg-primary-500, text-primary-500
 * - bg-neutral-100, text-neutral-400
 * - bg-white, bg-gray-100, text-gray-900
 * 
 * Typography:
 * - text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
 * - font-normal, font-medium, font-semibold, font-bold
 * - text-center, text-left, text-right
 * 
 * Borders & Radius:
 * - rounded, rounded-lg, rounded-xl, rounded-full
 * - border, border-2, border-gray-200
 * 
 * Shadows:
 * - shadow-sm, shadow, shadow-md, shadow-lg
 * 
 * Positioning:
 * - absolute, relative
 * - top-0, bottom-0, left-0, right-0
 * - z-10, z-20
 */
