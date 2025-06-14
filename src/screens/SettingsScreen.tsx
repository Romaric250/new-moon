import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { Colors } from '../constants/colors';

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
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
        disabled={item.type === 'toggle'}
      >
        <View style={styles.settingIcon}>
          <IconComponent size={20} color="#6B7280" />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          )}
        </View>

        <View style={styles.settingAction}>
          {item.type === 'toggle' ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E5E7EB', true: Colors.primary }}
              thumbColor={item.value ? Colors.white : '#F3F4F6'}
            />
          ) : (
            <ChevronRight size={20} color="#6B7280" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map(renderSettingItem)}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>OpenDreams v1.0.0</Text>
          <Text style={styles.versionSubtext}>Made with ❤️ for Cameroonian students</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingAction: {
    marginLeft: 12,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 24,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
