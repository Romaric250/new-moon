import React, { useEffect, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useAuthStore } from '../stores/auth-store';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initialize, isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    // Initialize auth state when the app starts
    initialize();
  }, [initialize]);

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-semibold text-gray-900 mb-2">
          OpenDreams
        </Text>
        <Text className="text-sm text-gray-600">
          Initializing...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};
