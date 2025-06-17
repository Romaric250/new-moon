import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { BaseComponentProps } from '../types';

interface InputProps extends BaseComponentProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View className="mb-4">
      <View
        className={`
          border rounded-xl bg-neutral-100 px-4 pt-2 pb-3 shadow-sm
          ${isFocused ? 'border-primary' : 'border-neutral-300'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <Text
          className={`
            text-sm font-medium mb-1
            ${isFocused ? 'text-primary' : 'text-neutral-400'}
          `}
        >
          {label}
        </Text>
        <View className="flex-row items-center">
          <TextInput
            className={`
              flex-1 text-base text-gray-900 py-1 min-h-[24px]
              ${disabled ? 'opacity-60' : ''}
              ${error ? 'text-red-500' : ''}
            `}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9C874A"
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            testID={testID}
          />
          {secureTextEntry && (
            <TouchableOpacity
              className="p-1 rounded"
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              activeOpacity={0.6}
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color="#9C874A" />
              ) : (
                <Eye size={20} color="#9C874A" />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {error && (
        <View className="mt-1">
          <Text className="text-sm text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
};


