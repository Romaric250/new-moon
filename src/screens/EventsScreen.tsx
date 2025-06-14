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
  Calendar,
  MapPin,
  Clock,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'lecture' | 'seminar';
  description: string;
}

interface EventsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Mastering the Art of Effective Communication',
      date: 'July 20, 2024',
      time: 'Saturday, July 20, 2024, 10:00 AM - 12:00 PM',
      location: 'Online via Zoom',
      type: 'workshop',
      description: 'Join us for an insightful workshop on effective communication, led by renowned Cameroonian communication expert, Dr. Ekwalla. Learn practical strategies to enhance your interpersonal skills, public speaking abilities, and overall communication effectiveness. This session is designed to equip you with the tools to articulate your thoughts clearly, connect with others, and achieve your goals through impactful communication.',
    },
    {
      id: '2',
      title: 'SAT Preparation Strategies',
      date: 'July 25, 2024',
      time: 'Thursday, July 25, 2024, 2:00 PM - 4:00 PM',
      location: 'Main Campus, Room 101',
      type: 'seminar',
      description: 'Comprehensive SAT preparation seminar covering test-taking strategies, time management, and subject-specific tips to help you achieve your target score.',
    },
    {
      id: '3',
      title: 'University Application Workshop',
      date: 'August 1, 2024',
      time: 'Thursday, August 1, 2024, 9:00 AM - 11:00 AM',
      location: 'Online via Zoom',
      type: 'workshop',
      description: 'Learn the ins and outs of university applications, including essay writing, recommendation letters, and application timelines.',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Learn', icon: BookOpen, active: false },
    { id: 'events', title: 'Events', icon: Users, active: true },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop':
        return '#10B981';
      case 'lecture':
        return '#3B82F6';
      case 'seminar':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const renderEvent = (event: Event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventCard}
      onPress={() => onNavigate('eventDetails', { event })}
      activeOpacity={0.7}
    >
      <View style={styles.eventHeader}>
        <View style={[
          styles.eventTypeIndicator,
          { backgroundColor: getEventTypeColor(event.type) }
        ]} />
        <Text style={styles.eventType}>{event.type.toUpperCase()}</Text>
      </View>
      
      <Text style={styles.eventTitle}>{event.title}</Text>
      
      <View style={styles.eventDetails}>
        <View style={styles.eventDetailRow}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.eventDetailText}>{event.date}</Text>
        </View>
        
        <View style={styles.eventDetailRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.eventDetailText}>{event.time}</Text>
        </View>
        
        <View style={styles.eventDetailRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Events</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map(renderEvent)}
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
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTypeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  eventType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    lineHeight: 24,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
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
