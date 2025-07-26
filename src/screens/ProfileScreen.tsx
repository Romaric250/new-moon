import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowLeft,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Settings,
  LogOut,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
} from 'lucide-react-native';

interface ProfileScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const userInfo = {
    name: 'Romaric',
    email: 'lonfonyuyromaric@gmail.com',
    phone: '+237 6XX XXX XXX',
    location: 'Cameroon',
    joinDate: 'January 2024',
  };

  const profileOptions = [
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      onPress: () => onNavigate('settings'),
    },
    {
      id: 'logout',
      title: 'Log Out',
      icon: LogOut,
      onPress: () => onNavigate('onboarding'),
      isDestructive: true,
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Learn', icon: BookOpen, active: false },
    { id: 'events', title: 'Events', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="p-2 -ml-2"
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="items-center py-8">
          <View className="mb-4">
            <View className="w-20 h-20 rounded-full bg-primary justify-center items-center">
              <Text className="text-2xl font-bold text-white">R</Text>
            </View>
          </View>

          <Text className="text-2xl font-bold text-gray-900 mb-1">{userInfo.name}</Text>
          <Text className="text-sm text-gray-600">Member since {userInfo.joinDate}</Text>
        </View>

        {/* Contact Information */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Contact Information</Text>

          <View className="flex-row items-center py-3 border-b border-gray-100">
            <Mail size={20} color="#6B7280" />
            <Text className="text-base text-gray-700 ml-3">{userInfo.email}</Text>
          </View>

          <View className="flex-row items-center py-3 border-b border-gray-100">
            <Phone size={20} color="#6B7280" />
            <Text className="text-base text-gray-700 ml-3">{userInfo.phone}</Text>
          </View>

          <View className="flex-row items-center py-3 border-b border-gray-100">
            <MapPin size={20} color="#6B7280" />
            <Text className="text-base text-gray-700 ml-3">{userInfo.location}</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Account</Text>

          {profileOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                className="flex-row items-center py-4 border-b border-gray-100"
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={20}
                  color={option.isDestructive ? '#EF4444' : '#6B7280'}
                />
                <Text className={`text-base ml-3 ${
                  option.isDestructive ? 'text-red-500' : 'text-gray-700'
                }`}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 pb-8">
        <View className="flex-row py-3 px-4 pt-4">
          {bottomTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                className="flex-1 items-center py-3 px-2 min-h-[60px]"
                onPress={() => onNavigate(tab.id)}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={24}
                  color={tab.active ? '#F2BD24' : '#6B7280'}
                />
                <Text
                  className="text-xs font-medium mt-1"
                  style={{ color: tab.active ? '#F2BD24' : '#6B7280' }}
                >
                  {tab.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;


