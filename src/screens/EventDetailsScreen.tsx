import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  ArrowLeft,
  MapPin,
  Clock,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface EventDetailsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  event?: {
    id: string;
    title: string;
    description: string;
    location: string;
    time: string;
  };
}

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  onNavigate,
  onBack,
  event = {
    id: '1',
    title: 'Mastering the Art of Effective Communication',
    description: 'Join us for an insightful workshop on effective communication, led by renowned Cameroonian communication expert, Dr. Ekwalla. Learn practical strategies to enhance your interpersonal skills, public speaking abilities, and overall communication effectiveness. This session is designed to equip you with the tools to articulate your thoughts clearly, connect with others, and achieve your goals through impactful communication.',
    location: 'Online via Zoom',
    time: 'Saturday, July 20, 2024, 10:00 AM - 12:00 PM',
  },
}) => {
  const handleSetReminder = () => {
    Alert.alert(
      'Reminder Set',
      'You will be notified about this event.',
      [{ text: 'OK' }]
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
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustration}>
            <View style={styles.computerScreen}>
              <View style={styles.screenHeader}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
              <View style={styles.screenContent}>
                <View style={styles.triangle} />
              </View>
            </View>
            <View style={styles.plant1} />
            <View style={styles.plant2} />
            <View style={styles.plant3} />
            <View style={styles.plant4} />
          </View>
        </View>

        {/* Event Title */}
        <View style={styles.titleSection}>
          <Text style={styles.eventTitle}>{event.title}</Text>
        </View>

        {/* Event Description */}
        <View style={styles.section}>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.infoRow}>
            <MapPin size={20} color="#6B7280" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
        </View>

        {/* Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time</Text>
          <View style={styles.infoRow}>
            <Clock size={20} color="#6B7280" />
            <Text style={styles.infoText}>{event.time}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Set Reminder Button */}
      <View style={styles.reminderContainer}>
        <TouchableOpacity
          style={styles.reminderButton}
          onPress={handleSetReminder}
          activeOpacity={0.8}
        >
          <Text style={styles.reminderButtonText}>Set Reminder</Text>
        </TouchableOpacity>
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
  },
  illustrationContainer: {
    backgroundColor: '#F3E8D3',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    position: 'relative',
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  computerScreen: {
    width: 120,
    height: 80,
    backgroundColor: '#374151',
    borderRadius: 8,
    overflow: 'hidden',
  },
  screenHeader: {
    flexDirection: 'row',
    backgroundColor: '#4B5563',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9CA3AF',
  },
  screenContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 25,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#10B981',
  },
  plant1: {
    position: 'absolute',
    left: 20,
    bottom: 0,
    width: 25,
    height: 40,
    backgroundColor: '#10B981',
    borderRadius: 12,
  },
  plant2: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    width: 20,
    height: 35,
    backgroundColor: '#34D399',
    borderRadius: 10,
  },
  plant3: {
    position: 'absolute',
    left: 50,
    bottom: 0,
    width: 15,
    height: 25,
    backgroundColor: '#6EE7B7',
    borderRadius: 8,
  },
  plant4: {
    position: 'absolute',
    right: 50,
    bottom: 0,
    width: 18,
    height: 30,
    backgroundColor: '#A7F3D0',
    borderRadius: 9,
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  eventDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
    lineHeight: 24,
  },
  reminderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reminderButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  reminderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
