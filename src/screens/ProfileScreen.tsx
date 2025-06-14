import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { Colors } from '../constants/colors';

interface ProfileScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
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
      onPress: () => {},
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
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>R</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.joinDate}>Member since {userInfo.joinDate}</Text>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoItem}>
            <Mail size={20} color="#6B7280" />
            <Text style={styles.infoText}>{userInfo.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Phone size={20} color="#6B7280" />
            <Text style={styles.infoText}>{userInfo.phone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={20} color="#6B7280" />
            <Text style={styles.infoText}>{userInfo.location}</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {profileOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={option.id}
                style={styles.optionItem}
                onPress={option.onPress}
                activeOpacity={0.7}
              >
                <IconComponent 
                  size={20} 
                  color={option.isDestructive ? '#EF4444' : '#6B7280'} 
                />
                <Text style={[
                  styles.optionText,
                  option.isDestructive && styles.destructiveText
                ]}>
                  {option.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {bottomTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                style={styles.bottomNavItem}
                onPress={() => onNavigate(tab.id)}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={24}
                  color={tab.active ? Colors.primary : '#6B7280'}
                />
                <Text
                  style={[
                    styles.bottomNavText,
                    { color: tab.active ? Colors.primary : '#6B7280' },
                  ]}
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  destructiveText: {
    color: '#EF4444',
  },
  bottomNavContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 34, // Extra padding for safe area
  },
  bottomNav: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    minHeight: 60, // Ensure minimum touch target
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
