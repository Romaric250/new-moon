import React, { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Home as HomeIcon,
  BookOpen,
  Calendar as CalendarIcon,
  User,
  Clock,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'session' | 'workshop' | 'lecture';
}

interface CalendarScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const [selectedView, setSelectedView] = useState<'Month' | 'Week'>('Month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 5)); // October 2024

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Math Tutoring Session',
      time: '10:00 AM - 11:00 AM',
      type: 'session',
    },
    {
      id: '2',
      title: 'Science Workshop',
      time: '1:00 PM - 2:00 PM',
      type: 'workshop',
    },
    {
      id: '3',
      title: 'History Lecture',
      time: '3:00 PM - 4:00 PM',
      type: 'lecture',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Learn', icon: BookOpen, active: false },
    { id: 'calendar', title: 'Calendar', icon: CalendarIcon, active: true },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const renderCalendarDay = (day: number | null, index: number) => {
    const isToday = day === 5; // Highlighting day 5 as shown in the design
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          isToday && styles.todayDay,
        ]}
        activeOpacity={day ? 0.7 : 1}
      >
        {day && (
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
          ]}>
            {day}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderEvent = (event: CalendarEvent) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventItem}
      onPress={() => onNavigate('eventDetails', { event })}
      activeOpacity={0.7}
    >
      <View style={styles.eventIndicator} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventTime}>{event.time}</Text>
      </View>
      <ChevronRight size={20} color="#6B7280" />
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
        <Text style={styles.headerTitle}>Calendar</Text>
        <View style={styles.placeholder} />
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedView === 'Month' && styles.activeToggle,
          ]}
          onPress={() => setSelectedView('Month')}
        >
          <Text style={[
            styles.toggleText,
            selectedView === 'Month' && styles.activeToggleText,
          ]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedView === 'Week' && styles.activeToggle,
          ]}
          onPress={() => setSelectedView('Week')}
        >
          <Text style={[
            styles.toggleText,
            selectedView === 'Week' && styles.activeToggleText,
          ]}>
            Week
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
          >
            <ChevronLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
          >
            <ChevronRight size={20} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          {/* Days of Week Header */}
          <View style={styles.daysHeader}>
            {daysOfWeek.map((day, index) => (
              <View key={index} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Days */}
          <View style={styles.daysGrid}>
            {getDaysInMonth(currentDate).map((day, index) => 
              renderCalendarDay(day, index)
            )}
          </View>
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          {events.map(renderEvent)}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
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
  viewToggle: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeToggle: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  toggleText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeToggleText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 24,
  },
  daysHeader: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayDay: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: '#111827',
  },
  todayText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  eventsSection: {
    paddingBottom: 24,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginRight: 16,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
