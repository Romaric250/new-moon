import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Bell,
  Map,
  Calendar,
  FileText,
  Home as HomeIcon,
  BookOpen,
  Users,
  User
} from 'lucide-react-native';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const navigationCards = [
    {
      id: 'roadmap',
      title: 'Roadmap',
      icon: Map,
      onPress: () => onNavigate('roadmap'),
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: Calendar,
      onPress: () => onNavigate('calendar'),
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: FileText,
      onPress: () => onNavigate('assignments'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      onPress: () => onNavigate('notifications'),
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: true },
    { id: 'learn', title: 'Learn', icon: BookOpen, active: false },
    { id: 'events', title: 'Events', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <View>
          <Text className="text-xl font-bold text-gray-900">OpenDreams</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View className="py-8">
          <Text className="text-3xl font-bold text-gray-900">Welcome back, Romaric</Text>
        </View>

        {/* Navigation Cards */}
        <View className="flex-row flex-wrap justify-between mb-8">
          {navigationCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <TouchableOpacity
                key={card.id}
                className="w-[48%] bg-white rounded-2xl p-6 mb-4 border border-gray-200 items-center shadow-sm"
                onPress={card.onPress}
                activeOpacity={0.7}
              >
                <IconComponent size={24} color="#111827" />
                <Text className="text-base font-semibold text-gray-900 mt-3 text-center">{card.title}</Text>
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


