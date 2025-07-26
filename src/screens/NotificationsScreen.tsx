import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Calendar,
  Trophy,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Home as HomeIcon,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Notification {
  id: string;
  type: 'assignment' | 'event' | 'achievement' | 'reminder' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

interface NotificationsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'assignment',
      title: 'New Assignment Available',
      message: 'SAT Math Practice Test 3 has been assigned. Due date: July 25, 2024',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'high',
    },
    {
      id: '2',
      type: 'event',
      title: 'Upcoming Workshop',
      message: 'Mastering the Art of Effective Communication starts in 1 hour',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'high',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Congratulations! 🎉',
      message: 'You completed the SAT Reading module with 95% accuracy!',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Study Reminder',
      message: 'Don\'t forget to review your vocabulary flashcards today',
      timestamp: '5 hours ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: '5',
      type: 'announcement',
      title: 'New Course Available',
      message: 'Advanced Essay Writing course is now available in your dashboard',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'medium',
    },
    {
      id: '6',
      type: 'event',
      title: 'Event Reminder',
      message: 'University Application Workshop tomorrow at 9:00 AM',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '7',
      type: 'achievement',
      title: 'Milestone Reached! 🏆',
      message: 'You\'ve completed 10 assignments this month. Keep up the great work!',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'low',
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return BookOpen;
      case 'event':
        return Calendar;
      case 'achievement':
        return Trophy;
      case 'reminder':
        return Clock;
      case 'announcement':
        return Bell;
      default:
        return AlertCircle;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return '#EF4444';
    
    switch (type) {
      case 'assignment':
        return '#3B82F6';
      case 'event':
        return '#8B5CF6';
      case 'achievement':
        return '#10B981';
      case 'reminder':
        return '#F59E0B';
      case 'announcement':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read and navigate if needed
    console.log('Notification pressed:', notification.title);
  };

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Learn', icon: BookOpen, active: false },
    { id: 'events', title: 'Events', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
          onPress={() => setFilter('all')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'unread' && styles.activeFilterTab]}
          onPress={() => setFilter('unread')}
          activeOpacity={0.7}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.activeFilterText]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={64} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."
              }
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type, notification.priority);
              
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification,
                  ]}
                  onPress={() => handleNotificationPress(notification)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <IconComponent size={20} color={iconColor} />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={[
                        styles.notificationTitle,
                        !notification.isRead && styles.unreadTitle,
                      ]}>
                        {notification.title}
                      </Text>
                      <Text style={styles.timestamp}>{notification.timestamp}</Text>
                    </View>
                    
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    
                    {notification.priority === 'high' && (
                      <View style={styles.priorityBadge}>
                        <Text style={styles.priorityText}>High Priority</Text>
                      </View>
                    )}
                  </View>
                  
                  {!notification.isRead && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  notificationsList: {
    paddingVertical: 8,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
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
  unreadNotification: {
    borderColor: Colors.primary,
    backgroundColor: '#FFFBEB',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#DC2626',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
    marginTop: 8,
  },
  bottomNavContainer: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 34,
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
    minHeight: 60,
  },
  bottomNavText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default NotificationsScreen;
