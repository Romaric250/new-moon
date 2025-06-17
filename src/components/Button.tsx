import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { BaseComponentProps } from '../types';

interface ButtonProps extends BaseComponentProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  testID,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    onPress();
  };

  // Get button classes based on variant
  const getButtonClasses = () => {
    let classes = 'border-2 items-center justify-center shadow-md rounded-xl ';

    // Add variant classes
    switch (variant) {
      case 'primary':
        classes += 'bg-primary border-primary ';
        break;
      case 'secondary':
        classes += 'bg-neutral-100 border-neutral-100 ';
        break;
      case 'outline':
        classes += 'bg-transparent border-primary ';
        break;
    }

    // Add size classes
    switch (size) {
      case 'sm':
        classes += 'px-4 py-2 min-h-[36px] ';
        break;
      case 'md':
        classes += 'px-6 py-3 min-h-[44px] ';
        break;
      case 'lg':
        classes += 'px-8 py-4 min-h-[52px] ';
        break;
    }

    // Add full width
    if (fullWidth) {
      classes += 'w-full ';
    }

    // Add disabled/loading opacity
    if (disabled || loading) {
      classes += 'opacity-50 ';
    }

    return classes.trim();
  };

  // Get text classes based on variant and size
  const getTextClasses = () => {
    let classes = 'font-semibold text-center ';

    // Add variant text classes
    switch (variant) {
      case 'primary':
        classes += 'text-white ';
        break;
      case 'secondary':
        classes += 'text-neutral-500 ';
        break;
      case 'outline':
        classes += 'text-primary ';
        break;
    }

    // Add size text classes
    switch (size) {
      case 'sm':
        classes += 'text-sm ';
        break;
      case 'md':
        classes += 'text-base ';
        break;
      case 'lg':
        classes += 'text-lg ';
        break;
    }

    return classes.trim();
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      onPress={handlePress}
      disabled={disabled || loading}
      testID={testID}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#FFFFFF' : '#F2BD24'}
        />
      ) : (
        <Text className={getTextClasses()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};


