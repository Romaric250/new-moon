import React from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { Colors } from '../constants/colors';

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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>Project Moon</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Romaric</Text>
        </View>

        {/* Navigation Cards */}
        <View style={styles.cardsContainer}>
          {navigationCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <TouchableOpacity
                key={card.id}
                style={styles.card}
                onPress={card.onPress}
                activeOpacity={0.7}
              >
                <IconComponent size={24} color="#111827" />
                <Text style={styles.cardTitle}>{card.title}</Text>
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
                <Text style={[
                  styles.bottomNavText,
                  { color: tab.active ? Colors.primary : '#6B7280' }
                ]}>
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
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeSection: {
    paddingVertical: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
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
