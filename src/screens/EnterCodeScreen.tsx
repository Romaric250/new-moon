import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

interface EnterCodeScreenProps {
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export const EnterCodeScreen: React.FC<EnterCodeScreenProps> = ({
  onClose,
  onSubmit
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simplified animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    if (code.length < 6) return;

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(code);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="flex-1 px-6 py-4"
        >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-md"
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <X size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Enter Code</Text>
          <View className="w-10" />
        </View>

          {/* Content */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingTop: 24, paddingBottom: 20, flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Text className="text-2xl font-bold text-gray-900 mb-8 leading-8">
              Enter your admission code
            </Text>

            <View className="mb-6">
              <Input
                label=""
                value={code}
                onChangeText={setCode}
                placeholder="XXXXXX"
                keyboardType="default"
                autoCapitalize="characters"
                testID="admission-code-input"
              />
            </View>

            <Text className="text-base text-gray-600 leading-6">
              This code was sent to your email address.
            </Text>
          </ScrollView>

          {/* Submit Button */}
          <Animated.View
            style={{ transform: [{ scale: buttonScaleAnim }] }}
            className="pb-8 pt-4"
          >
            <Button
              title="Submit"
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={code.length < 6}
            />
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


