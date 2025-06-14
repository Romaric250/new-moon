import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  ArrowLeft,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface CourseDetailsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  course?: {
    id: string;
    title: string;
    instructor: string;
    description?: string;
  };
}

export const CourseDetailsScreen: React.FC<CourseDetailsScreenProps> = ({
  onNavigate,
  onBack,
  course = {
    id: '1',
    title: 'SAT Prep',
    instructor: 'Ms. Ebele',
    description: 'This course provides a comprehensive introduction to SAT preparation, covering fundamental topics such as reading comprehension, math strategies, and essay writing. Students will learn to approach the test with confidence and achieve their target scores, preparing them for success in university admissions.',
  },
}) => {
  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Courses', icon: BookOpen, active: true },
    { id: 'community', title: 'Community', icon: Users, active: false },
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
        <Text style={styles.headerTitle}>Course Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Course Image */}
        <View style={styles.imageContainer}>
          <View style={styles.courseImage}>
            <View style={styles.documentIllustration}>
              <View style={styles.document}>
                <View style={styles.documentHeader} />
                <View style={styles.documentLine} />
                <View style={styles.documentLine} />
                <View style={styles.documentLine} />
              </View>
              <View style={styles.plant1} />
              <View style={styles.plant2} />
            </View>
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.courseDescription}>{course.description}</Text>

          {/* Instructor Section */}
          <View style={styles.instructorSection}>
            <Text style={styles.sectionTitle}>Instructor</Text>
            <View style={styles.instructorCard}>
              <View style={styles.instructorAvatar}>
                <Text style={styles.instructorInitial}>
                  {course.instructor.charAt(0)}
                </Text>
              </View>
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorName}>{course.instructor}</Text>
                <Text style={styles.instructorTitle}>Test Prep Expert</Text>
              </View>
            </View>
          </View>

          {/* Modules Section */}
          <View style={styles.modulesSection}>
            <View style={styles.modulesHeader}>
              <Text style={styles.sectionTitle}>Modules</Text>
              <Text style={styles.moduleCount}>12</Text>
            </View>
          </View>

          {/* Start Course Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => onNavigate('courseModules', { course })}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>Start Course</Text>
          </TouchableOpacity>
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
  },
  imageContainer: {
    backgroundColor: '#FED7AA',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseImage: {
    width: 200,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIllustration: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  document: {
    width: 80,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  documentHeader: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  documentLine: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    marginBottom: 6,
  },
  plant1: {
    position: 'absolute',
    left: 20,
    bottom: 10,
    width: 30,
    height: 40,
    backgroundColor: '#10B981',
    borderRadius: 15,
  },
  plant2: {
    position: 'absolute',
    right: 20,
    bottom: 10,
    width: 25,
    height: 35,
    backgroundColor: '#34D399',
    borderRadius: 12,
  },
  courseInfo: {
    padding: 24,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  courseDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
  },
  instructorSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructorInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  instructorTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  modulesSection: {
    marginBottom: 32,
  },
  modulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
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
