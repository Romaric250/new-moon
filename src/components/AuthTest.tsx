import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export const AuthTest: React.FC = () => {
  const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth();

  const handleTestLogin = async () => {
    const result = await signIn('test@example.com', 'password');
    console.log('Login result:', result);
  };

  const handleTestLogout = async () => {
    await signOut();
    console.log('Logged out');
  };

  return (
    <View className="p-4 bg-white">
      <Text className="text-lg font-bold mb-4">Auth Test</Text>
      
      <Text className="mb-2">
        Status: {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
      </Text>
      
      {user && (
        <Text className="mb-2">
          User: {user.name} ({user.email})
        </Text>
      )}
      
      <Text className="mb-4">
        Loading: {isLoading ? 'Yes' : 'No'}
      </Text>
      
      {!isAuthenticated ? (
        <TouchableOpacity
          onPress={handleTestLogin}
          className="bg-blue-500 p-3 rounded mb-2"
          disabled={isLoading}
        >
          <Text className="text-white text-center">
            Test Login (test@example.com)
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleTestLogout}
          className="bg-red-500 p-3 rounded mb-2"
          disabled={isLoading}
        >
          <Text className="text-white text-center">
            Logout
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
