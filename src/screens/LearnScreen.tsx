import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {
  Search,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
  Menu,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress?: number;
  status: 'in-progress' | 'completed';
  color: string;
  image: string;
}

interface LearnScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const inProgressCourses: Course[] = [
    {
      id: '1',
      title: 'SAT Prep - Math',
      instructor: 'Dr. Njoya',
      status: 'in-progress',
      color: '#F3F4F6',
      image: 'math',
    },
    {
      id: '2',
      title: 'SAT Prep - Reading',
      instructor: 'Dr. Mbella',
      status: 'in-progress',
      color: '#FED7AA',
      image: 'reading',
    },
    {
      id: '3',
      title: 'SAT Prep - Writing',
      instructor: 'Dr. Ewane',
      status: 'in-progress',
      color: '#FEF3C7',
      image: 'writing',
    },
  ];

  const completedCourses: Course[] = [
    {
      id: '4',
      title: 'SAT Prep - Practice Test 1',
      instructor: 'Dr. Njoya',
      status: 'completed',
      color: '#D1FAE5',
      image: 'test1',
    },
    {
      id: '5',
      title: 'SAT Prep - Practice Test 2',
      instructor: 'Dr. Mbella',
      status: 'completed',
      color: '#BFDBFE',
      image: 'test2',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Courses', icon: BookOpen, active: true },
    { id: 'community', title: 'Community', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const renderCourseCard = (course: Course) => (
    <TouchableOpacity
      key={course.id}
      style={[styles.courseCard, { backgroundColor: course.color }]}
      onPress={() => onNavigate('courseDetails', { course })}
      activeOpacity={0.7}
    >
      <View style={styles.courseImageContainer}>
        <View style={styles.courseImagePlaceholder}>
          {course.image === 'math' && (
            <Text style={styles.mathFormula}>
              {`sin(θ) = a/h\nsin θ = 1/2\nsin² x + cos² x = 1\ntan x = sin x/cos x\nlog₂8 = 3`}
            </Text>
          )}
          {course.image === 'reading' && (
            <View style={styles.readingDocument}>
              <View style={styles.documentHeader} />
              <View style={styles.documentLine} />
              <View style={styles.documentLine} />
              <View style={styles.documentLine} />
              <View style={styles.documentLine} />
            </View>
          )}
          {course.image === 'writing' && (
            <View style={styles.writingContainer}>
              <View style={styles.pencil} />
              <View style={styles.plant} />
            </View>
          )}
          {course.image === 'test1' && (
            <View style={styles.testContainer}>
              <View style={styles.testPaper} />
            </View>
          )}
          {course.image === 'test2' && (
            <View style={styles.testContainer}>
              <View style={styles.testPaper} />
              <View style={styles.pencilIcon} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>{course.instructor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Courses</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* In Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In progress</Text>
          <View style={styles.coursesGrid}>
            {inProgressCourses.map(renderCourseCard)}
          </View>
        </View>

        {/* Completed Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed</Text>
          <View style={styles.coursesGrid}>
            {completedCourses.map(renderCourseCard)}
          </View>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  menuButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  courseImageContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImagePlaceholder: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mathFormula: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'left',
    lineHeight: 14,
  },
  readingDocument: {
    width: 60,
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentHeader: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 6,
  },
  documentLine: {
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginBottom: 4,
  },
  writingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  pencil: {
    width: 4,
    height: 40,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
  },
  plant: {
    width: 20,
    height: 30,
    backgroundColor: '#10B981',
    borderRadius: 10,
  },
  testContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  testPaper: {
    width: 50,
    height: 60,
    backgroundColor: Colors.white,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pencilIcon: {
    width: 20,
    height: 4,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    position: 'absolute',
    bottom: 10,
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 12,
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
