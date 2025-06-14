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
  Play,
  FileText,
  Download,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface LessonDetailsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  lesson?: {
    id: string;
    title: string;
    description: string;
  };
}

export const LessonDetailsScreen: React.FC<LessonDetailsScreenProps> = ({
  onNavigate,
  onBack,
  lesson = {
    id: '1',
    title: 'Lesson 1: Introduction to SAT Prep',
    description: 'Welcome to the exciting world of SAT Prep! In this introductory lesson, we\'ll explore the fundamental concepts that underpin the study of matter, energy, and their interactions. Get ready to unravel the mysteries of the universe!',
  },
}) => {
  const materials = [
    {
      id: '1',
      title: 'Lesson 1 Notes',
      type: 'PDF',
      icon: FileText,
    },
    {
      id: '2',
      title: 'Additional Resources',
      type: 'PDF',
      icon: FileText,
    },
  ];

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          {lesson.title}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Lesson Title */}
        <View style={styles.titleSection}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        </View>

        {/* Video Section */}
        <View style={styles.videoSection}>
          <View style={styles.videoContainer}>
            <View style={styles.videoPlaceholder}>
              <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
                <Play size={32} color={Colors.white} fill={Colors.white} />
              </TouchableOpacity>
              <View style={styles.videoOverlay}>
                <Text style={styles.videoTitle}>SAT Prep Introduction</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Lesson Materials */}
        <View style={styles.materialsSection}>
          <Text style={styles.sectionTitle}>Lesson Materials</Text>
          {materials.map((material) => {
            const IconComponent = material.icon;
            return (
              <TouchableOpacity
                key={material.id}
                style={styles.materialItem}
                activeOpacity={0.7}
              >
                <View style={styles.materialIcon}>
                  <IconComponent size={20} color="#6B7280" />
                </View>
                <View style={styles.materialInfo}>
                  <Text style={styles.materialTitle}>{material.title}</Text>
                  <Text style={styles.materialType}>{material.type}</Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Download size={20} color="#6B7280" />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Complete Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              // Handle lesson completion
              onBack();
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>Mark as Complete</Text>
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
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  titleSection: {
    padding: 24,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  lessonDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  videoSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  videoContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
  },
  videoPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  materialsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    marginBottom: 12,
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  materialType: {
    fontSize: 12,
    color: '#6B7280',
  },
  downloadButton: {
    padding: 8,
  },
  actionSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  completeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonText: {
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
