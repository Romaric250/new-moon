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
  ChevronDown,
  ChevronUp,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
}

interface CourseModulesScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  course?: {
    id: string;
    title: string;
  };
}

export const CourseModulesScreen: React.FC<CourseModulesScreenProps> = ({
  onNavigate,
  onBack,
  course = { id: '1', title: 'SAT Prep' },
}) => {
  const [expandedModule, setExpandedModule] = useState<string | null>('1');

  const modules: Module[] = [
    {
      id: '1',
      title: 'Module 1: Reading Comprehension',
      description: 'This module focuses on improving reading comprehension skills, including identifying main ideas, analyzing text structure, and understanding author\'s purpose.',
      lessons: 8,
      duration: '2 hours',
    },
    {
      id: '2',
      title: 'Module 2: Math Strategies',
      description: 'Learn essential math strategies for the SAT, covering algebra, geometry, and data analysis.',
      lessons: 12,
      duration: '3 hours',
    },
    {
      id: '3',
      title: 'Module 3: Essay Writing',
      description: 'Master the art of essay writing with structured approaches to analysis and argumentation.',
      lessons: 6,
      duration: '1.5 hours',
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Courses', icon: BookOpen, active: true },
    { id: 'community', title: 'Community', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const renderModule = (module: Module) => {
    const isExpanded = expandedModule === module.id;

    return (
      <View key={module.id} style={styles.moduleContainer}>
        <TouchableOpacity
          style={styles.moduleHeader}
          onPress={() => toggleModule(module.id)}
          activeOpacity={0.7}
        >
          <View style={styles.moduleHeaderContent}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            {isExpanded ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.moduleContent}>
            <Text style={styles.moduleDescription}>{module.description}</Text>
            <View style={styles.moduleStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{module.lessons}</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{module.duration}</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.startModuleButton}
              onPress={() => onNavigate('lessonDetails', { module, course })}
              activeOpacity={0.8}
            >
              <Text style={styles.startModuleButtonText}>Start Module</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
        <Text style={styles.headerTitle}>{course.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Modules Section */}
        <View style={styles.modulesSection}>
          <Text style={styles.sectionTitle}>Modules</Text>
          {modules.map(renderModule)}
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
  modulesSection: {
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },
  moduleContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
  },
  moduleHeader: {
    padding: 20,
  },
  moduleHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 16,
  },
  moduleContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  moduleStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    marginRight: 32,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  startModuleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  startModuleButtonText: {
    fontSize: 14,
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
