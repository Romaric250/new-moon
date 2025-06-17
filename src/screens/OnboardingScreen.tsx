import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { OpenDreamsLogo } from '../components/OpenDreamsLogo';
import { OpenDreamsTextLogo } from '../components/OpenDreamsTextLogo';

interface OnboardingScreenProps {
  onNext: () => void;
  onLogin?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext, onLogin }) => {
  const [logoError, setLogoError] = React.useState(false);

  const LogoComponent = () => {
    try {
      if (logoError) {
        return <OpenDreamsTextLogo width={200} height={120} size="medium" />;
      }
      return <OpenDreamsLogo width={200} height={120} />;
    } catch (error) {
      return <OpenDreamsTextLogo width={200} height={120} size="medium" />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="flex-1 px-6 pt-4 pb-4">
        {/* Header with OpenDreams Logo */}
        <View className="justify-center items-center py-6 min-h-[35%] max-h-[45%]">
          {/* OpenDreams Logo */}
          <View className="w-[70%] aspect-square max-w-[280px] max-h-[280px] bg-white rounded-[20px] mb-4 items-center justify-center shadow-lg">
            <LogoComponent />
          </View>

          {/* Pagination dots */}
          <View className="flex-row mb-6">
            <View className="w-2 h-2 rounded-full bg-primary mx-1" />
            <View className="w-2 h-2 rounded-full bg-gray-300 mx-1" />
            <View className="w-2 h-2 rounded-full bg-gray-300 mx-1" />
          </View>
        </View>

        {/* Content */}
        <View className="mb-6 px-2">
          <Text className="text-[26px] font-bold text-gray-900 text-center mb-4 leading-8">
            Welcome to OpenDreams
          </Text>
          <Text className="text-[15px] text-gray-600 text-center leading-[22px] px-3">
            OpenDreams is an exclusive online learning platform for high-achieving Cameroonian
            students. We provide access to top-tier educational resources and a supportive
            community to help you reach your full potential.
          </Text>
        </View>

        {/* CTA Buttons */}
        <View className="pb-6 px-2 mt-auto">
          <TouchableOpacity
            className="bg-primary border-2 border-primary rounded-xl py-4 px-8 items-center justify-center shadow-md active:opacity-70"
            onPress={onNext}
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold text-lg text-center">
              Get Started
            </Text>
          </TouchableOpacity>

          {onLogin && (
            <View className="mt-3 items-center">
              <Text className="text-[13px] text-gray-600 mb-2 text-center">
                Already have an account?
              </Text>
              <TouchableOpacity
                className="bg-transparent border-2 border-primary rounded-xl py-3 px-6 items-center justify-center active:opacity-70"
                onPress={onLogin}
                activeOpacity={0.7}
              >
                <Text className="text-primary font-semibold text-base text-center">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};


