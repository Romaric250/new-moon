import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  FileText,
  Star,
  Download,
  Trash2,
  ChevronRight,
} from 'lucide-react-native';

interface SettingsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Receive updates about courses and assignments',
          icon: Bell,
          type: 'toggle',
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          icon: Moon,
          type: 'toggle',
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'language',
          title: 'Language',
          subtitle: 'English',
          icon: Globe,
          type: 'navigation',
          onPress: () => Alert.alert('Language', 'Language selection coming soon!'),
        },
      ],
    },
    {
      title: 'Downloads',
      items: [
        {
          id: 'wifiOnly',
          title: 'Download over Wi-Fi only',
          subtitle: 'Save mobile data',
          icon: Download,
          type: 'toggle',
          value: downloadOverWifi,
          onToggle: setDownloadOverWifi,
        },
        {
          id: 'clearCache',
          title: 'Clear Cache',
          subtitle: 'Free up storage space',
          icon: Trash2,
          type: 'action',
          onPress: () => {
            Alert.alert(
              'Clear Cache',
              'This will remove all downloaded content. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: () => {} },
              ]
            );
          },
        },
      ],
    },
    {
      title: 'Account & Security',
      items: [
        {
          id: 'privacy',
          title: 'Privacy Settings',
          subtitle: 'Manage your privacy preferences',
          icon: Shield,
          type: 'navigation',
          onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon!'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          title: 'Help Center',
          subtitle: 'Get help and support',
          icon: HelpCircle,
          type: 'navigation',
          onPress: () => Alert.alert('Help', 'Help center coming soon!'),
        },
        {
          id: 'terms',
          title: 'Terms of Service',
          subtitle: 'Read our terms and conditions',
          icon: FileText,
          type: 'navigation',
          onPress: () => Alert.alert('Terms', 'Terms of service coming soon!'),
        },
        {
          id: 'rate',
          title: 'Rate OpenDreams',
          subtitle: 'Share your feedback',
          icon: Star,
          type: 'navigation',
          onPress: () => Alert.alert('Rate App', 'Thank you for your feedback!'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        className="flex-row items-center px-4 py-4 border-b border-gray-100"
        onPress={item.onPress}
        activeOpacity={0.7}
        disabled={item.type === 'toggle'}
      >
        <View className="w-10 h-10 rounded-lg bg-gray-50 justify-center items-center mr-3">
          <IconComponent size={20} color="#6B7280" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-medium text-gray-900 mb-0.5">{item.title}</Text>
          {item.subtitle && (
            <Text className="text-sm text-gray-600">{item.subtitle}</Text>
          )}
        </View>

        <View className="ml-3">
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E5E7EB', true: '#F2BD24' }}
              thumbColor={item.value ? '#FFFFFF' : '#F3F4F6'}
            />
          ) : (
            <ChevronRight size={20} color="#6B7280" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
        <Text className="text-lg font-semibold text-gray-900">Settings</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.title} className="mt-8">
            <Text className="text-base font-semibold text-gray-900 mb-3">{section.title}</Text>
            <View className="bg-white rounded-xl border border-gray-200">
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View className="items-center py-8 mt-6">
          <Text className="text-sm font-medium text-gray-600 mb-1">OpenDreams v1.0.0</Text>
          <Text className="text-xs text-gray-400">Made with ❤️ for Cameroonian students</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


