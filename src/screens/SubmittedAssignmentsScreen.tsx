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
  Download,
  Home as HomeIcon,
  BookOpen,
  Calendar,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface SubmittedAssignment {
  id: string;
  title: string;
  submittedDate: string;
}

interface SubmittedAssignmentsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const SubmittedAssignmentsScreen: React.FC<SubmittedAssignmentsScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const submittedAssignments: SubmittedAssignment[] = [
    {
      id: '1',
      title: 'Essay on Cameroonian History',
      submittedDate: 'Submitted: 2024-01-15',
    },
    {
      id: '2',
      title: 'Math Problem Set 3',
      submittedDate: 'Submitted: 2023-12-20',
    },
    {
      id: '3',
      title: 'Science Lab Report',
      submittedDate: 'Submitted: 2023-11-05',
    },
    {
      id: '4',
      title: 'French Oral Presentation',
      submittedDate: 'Submitted: 2023-10-12',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'assignments', title: 'Assignments', icon: FileText, active: true },
    { id: 'resources', title: 'Resources', icon: BookOpen, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const renderSubmittedAssignment = (assignment: SubmittedAssignment) => (
    <View key={assignment.id} style={styles.assignmentItem}>
      <View style={styles.assignmentIcon}>
        <FileText size={20} color="#6B7280" />
      </View>
      <View style={styles.assignmentContent}>
        <Text style={styles.assignmentTitle}>{assignment.title}</Text>
        <Text style={styles.submittedDate}>{assignment.submittedDate}</Text>
      </View>
      <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
        <Download size={20} color="#6B7280" />
      </TouchableOpacity>
    </View>
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
        <Text style={styles.headerTitle}>Submitted Assignments</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Past Submissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Submissions</Text>
          {submittedAssignments.map(renderSubmittedAssignment)}
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
  submittedDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  downloadButton: {
    padding: 8,
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
