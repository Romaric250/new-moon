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
  FileText,
  Home as HomeIcon,
  BookOpen,
  Calendar,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Assignment {
  id: string;
  title: string;
  dueInfo: string;
  status: 'current' | 'past';
  statusColor: string;
}

interface AssignmentsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const AssignmentsScreen: React.FC<AssignmentsScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const currentAssignments: Assignment[] = [
    {
      id: '1',
      title: 'Math Assignment 1',
      dueInfo: 'Due in 2 days',
      status: 'current',
      statusColor: '#10B981',
    },
    {
      id: '2',
      title: 'Physics Assignment 2',
      dueInfo: 'Due in 5 days',
      status: 'current',
      statusColor: '#10B981',
    },
  ];

  const pastAssignments: Assignment[] = [
    {
      id: '3',
      title: 'Chemistry Assignment 1',
      dueInfo: 'Submitted on Jan 15, 2024',
      status: 'past',
      statusColor: '#10B981',
    },
    {
      id: '4',
      title: 'Biology Assignment 1',
      dueInfo: 'Submitted on Jan 10, 2024',
      status: 'past',
      statusColor: '#10B981',
    },
    {
      id: '5',
      title: 'History Assignment 1',
      dueInfo: 'Due on Jan 5, 2024',
      status: 'past',
      statusColor: '#10B981',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'assignments', title: 'Assignments', icon: FileText, active: true },
    { id: 'resources', title: 'Resources', icon: BookOpen, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const renderAssignment = (assignment: Assignment) => (
    <TouchableOpacity
      key={assignment.id}
      style={styles.assignmentItem}
      onPress={() => onNavigate('assignmentDetails', { assignment })}
      activeOpacity={0.7}
    >
      <View style={styles.assignmentIcon}>
        <FileText size={20} color="#6B7280" />
      </View>
      <View style={styles.assignmentContent}>
        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
        <Text style={styles.assignmentDue}>{assignment.dueInfo}</Text>
      </View>
      <View style={[
        styles.statusIndicator,
        { backgroundColor: assignment.statusColor }
      ]} />
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
        <Text style={styles.headerTitle}>Assignments</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Assignments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current</Text>
          {currentAssignments.map(renderAssignment)}
        </View>

        {/* Past Assignments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past</Text>
          {pastAssignments.map(renderAssignment)}
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
  assignmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  assignmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
