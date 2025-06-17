import React from 'react';
import { View, Text } from 'react-native';

interface OpenDreamsTextLogoProps {
  width?: number;
  height?: number;
  size?: 'small' | 'medium' | 'large';
}

export const OpenDreamsTextLogo: React.FC<OpenDreamsTextLogoProps> = ({ 
  width = 200, 
  height = 120,
  size = 'medium'
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'py-2',
          sun: 'text-2xl mb-1',
          openText: 'text-lg',
          dreamsText: 'text-lg',
          tagline: 'text-xs'
        };
      case 'large':
        return {
          container: 'py-6',
          sun: 'text-5xl mb-3',
          openText: 'text-3xl',
          dreamsText: 'text-3xl',
          tagline: 'text-base'
        };
      default: // medium
        return {
          container: 'py-4',
          sun: 'text-4xl mb-2',
          openText: 'text-2xl',
          dreamsText: 'text-2xl',
          tagline: 'text-sm'
        };
    }
  };

  const classes = getSizeClasses();

  return (
    <View 
      style={{ width, height }} 
      className={`items-center justify-center ${classes.container}`}
    >
      {/* Sun and Book Icon */}
      <View className="items-center mb-2">
        <Text className={`${classes.sun}`}>☀️📚</Text>
      </View>
      
      {/* OpenDreams Text */}
      <View className="items-center">
        <View className="flex-row items-baseline">
          <Text className={`font-bold text-blue-600 ${classes.openText}`}>
            Open
          </Text>
          <Text className={`font-bold text-yellow-500 ${classes.dreamsText}`}>
            Dreams
          </Text>
        </View>
        
        {/* Tagline */}
        <Text className={`text-gray-600 text-center mt-1 ${classes.tagline}`}>
          Learning • Growth • Success
        </Text>
      </View>
    </View>
  );
};
