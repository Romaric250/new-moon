import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface ScanAnalyzeScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  cropId: string;
}

const ScanAnalyzeScreen: React.FC<ScanAnalyzeScreenProps> = ({ onNavigate, onBack, cropId }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [deviceStatus, setDeviceStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [soilData, setSoilData] = useState<any>(null);
  
  const pulseAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    if (isScanning) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();

      // Rotation animation
      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 3000, useNativeDriver: true })
      ).start();
    }
  }, [isScanning]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleStartScan = () => {
    setIsScanning(true);
    setDeviceStatus('connecting');
    
    // Simulate device connection
    setTimeout(() => {
      setDeviceStatus('connected');
    }, 2000);

    // Simulate scanning progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        
        // Simulate soil data collection
        setTimeout(() => {
          setSoilData({
            temperature: 24.5,
            humidity: 68,
            pH: 6.8,
            moisture: 72,
            nitrogen: 45,
            phosphorus: 32,
            potassium: 58,
            organicMatter: 3.2,
          });
        }, 1000);
      }
    }, 500);
  };

  const handleContinue = () => {
    onNavigate('resultRecommendation', { 
      soilData, 
      cropId,
      cropName: 'Maize' // This would come from the cropId
    });
  };

  const renderDeviceStatus = () => {
    const statusConfig = {
      disconnected: { color: '#EF4444', icon: 'bluetooth-off', text: 'Device Disconnected' },
      connecting: { color: '#F59E0B', icon: 'bluetooth', text: 'Connecting...' },
      connected: { color: '#10B981', icon: 'bluetooth', text: 'Device Connected' },
    };

    const config = statusConfig[deviceStatus];

    return (
      <View className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-bold text-gray-800">IoT Device Status</Text>
          <View className={`w-3 h-3 rounded-full`} style={{ backgroundColor: config.color }} />
        </View>
        
        <View className="flex-row items-center">
          <View className={`w-12 h-12 rounded-full items-center justify-center mr-4`} style={{ backgroundColor: `${config.color}20` }}>
            <Ionicons name={config.icon as any} size={24} color={config.color} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">{config.text}</Text>
            <Text className="text-sm text-gray-600">Smart Soil Sensor v2.1</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderScanProgress = () => (
    <View className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-800">Scan Progress</Text>
        <Text className="text-lg font-bold text-green-600">{scanProgress}%</Text>
      </View>
      
      <View className="mb-4">
        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${scanProgress}%` }}
          />
        </View>
      </View>

      <View className="flex-row justify-between text-sm text-gray-600">
        <Text>Temperature</Text>
        <Text>Humidity</Text>
        <Text>pH Level</Text>
        <Text>Moisture</Text>
      </View>
    </View>
  );

  const renderSoilData = () => (
    <View className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
      <Text className="text-lg font-bold text-gray-800 mb-4">Soil Analysis Results</Text>
      
      <View className="space-y-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-red-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="thermometer" size={20} color="#EF4444" />
            </View>
            <Text className="text-gray-700">Temperature</Text>
          </View>
          <Text className="text-lg font-bold text-gray-800">{soilData?.temperature}°C</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="water" size={20} color="#3B82F6" />
            </View>
            <Text className="text-gray-700">Humidity</Text>
          </View>
          <Text className="text-lg font-bold text-gray-800">{soilData?.humidity}%</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-purple-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="flask" size={20} color="#8B5CF6" />
            </View>
            <Text className="text-gray-700">pH Level</Text>
          </View>
          <Text className="text-lg font-bold text-gray-800">{soilData?.pH}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-green-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="leaf" size={20} color="#10B981" />
            </View>
            <Text className="text-gray-700">Moisture</Text>
          </View>
          <Text className="text-lg font-bold text-gray-800">{soilData?.moisture}%</Text>
        </View>
      </View>
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
          <Text className="text-xl font-bold text-gray-800">Scan & Analyze</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Device Status */}
        {renderDeviceStatus()}

        {/* Scan Progress */}
        {isScanning && renderScanProgress()}

        {/* Soil Data */}
        {soilData && renderSoilData()}

        {/* Action Buttons */}
        <View className="mb-6">
          {!isScanning && !soilData && (
            <TouchableOpacity
              className="bg-green-500 rounded-2xl py-4 px-6 mb-4"
              onPress={handleStartScan}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="scan" size={24} color="white" className="mr-2" />
                <Text className="text-white text-lg font-bold ml-2">Start Soil Analysis</Text>
              </View>
            </TouchableOpacity>
          )}

          {soilData && (
            <TouchableOpacity
              className="bg-blue-500 rounded-2xl py-4 px-6"
              onPress={handleContinue}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="analytics" size={24} color="white" className="mr-2" />
                <Text className="text-white text-lg font-bold ml-2">View Recommendations</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Scanning Animation */}
        {isScanning && (
          <View className="items-center py-8">
            <Animated.View
              style={{
                transform: [{ scale: pulseAnim }, { rotate: spin }],
              }}
              className="w-32 h-32 bg-green-100 rounded-full items-center justify-center"
            >
              <Ionicons name="scan-circle" size={64} color="#10B981" />
            </Animated.View>
            <Text className="text-gray-600 mt-4 text-center">Analyzing soil composition...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScanAnalyzeScreen; 