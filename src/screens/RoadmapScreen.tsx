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
  CheckCircle,
  Circle,
  Lock,
  Home as HomeIcon,
  Map,
  Users,
  BookOpen,
  User,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface RoadmapItem {
  id: string;
  title: string;
  status: 'complete' | 'in-progress' | 'next' | 'locked';
  progress?: number;
}

interface RoadmapPhase {
  id: string;
  title: string;
  items: RoadmapItem[];
}

interface RoadmapScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const phases: RoadmapPhase[] = [
    {
      id: '1',
      title: 'Phase 1: Foundations',
      items: [
        {
          id: '1',
          title: 'Introduction to Project Moon',
          status: 'complete',
        },
        {
          id: '2',
          title: 'Understanding Your Goals',
          status: 'complete',
        },
        {
          id: '3',
          title: 'Building a Strong Profile',
          status: 'complete',
        },
        {
          id: '4',
          title: 'Networking Basics',
          status: 'complete',
        },
      ],
    },
    {
      id: '2',
      title: 'Phase 2: Skill Development',
      items: [
        {
          id: '5',
          title: 'Advanced Communication',
          status: 'in-progress',
          progress: 60,
        },
        {
          id: '6',
          title: 'Critical Thinking',
          status: 'in-progress',
          progress: 40,
        },
        {
          id: '7',
          title: 'Leadership Essentials',
          status: 'next',
        },
        {
          id: '8',
          title: 'Problem Solving Strategies',
          status: 'next',
        },
      ],
    },
    {
      id: '3',
      title: 'Phase 3: Application Mastery',
      items: [
        {
          id: '9',
          title: 'Crafting a Compelling Essay',
          status: 'locked',
        },
        {
          id: '10',
          title: 'Interview Preparation',
          status: 'locked',
        },
        {
          id: '11',
          title: 'Portfolio Building',
          status: 'locked',
        },
      ],
    },
  ];

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'roadmap', title: 'Roadmap', icon: Map, active: true },
    { id: 'community', title: 'Community', icon: Users, active: false },
    { id: 'resources', title: 'Resources', icon: BookOpen, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle size={20} color="#10B981" />;
      case 'in-progress':
        return <Circle size={20} color={Colors.primary} />;
      case 'next':
        return <Circle size={20} color="#6B7280" />;
      case 'locked':
        return <Lock size={20} color="#9CA3AF" />;
      default:
        return <Circle size={20} color="#6B7280" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in-progress':
        return 'In Progress';
      case 'next':
        return 'Next';
      case 'locked':
        return 'Locked';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return '#10B981';
      case 'in-progress':
        return Colors.primary;
      case 'next':
        return '#6B7280';
      case 'locked':
        return '#9CA3AF';
      default:
        return '#6B7280';
    }
  };

  const renderRoadmapItem = (item: RoadmapItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.roadmapItem,
        item.status === 'locked' && styles.lockedItem,
      ]}
      onPress={() => {
        if (item.status !== 'locked') {
          onNavigate('courseDetails', { item });
        }
      }}
      activeOpacity={item.status === 'locked' ? 1 : 0.7}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          {getStatusIcon(item.status)}
          <Text
            style={[
              styles.itemTitle,
              item.status === 'locked' && styles.lockedText,
            ]}
          >
            {item.title}
          </Text>
        </View>
        <Text
          style={[
            styles.statusText,
            { color: getStatusColor(item.status) },
          ]}
        >
          {getStatusText(item.status)}
        </Text>
        {item.progress && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>{item.progress}% Complete</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.progress}%` },
                ]}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderPhase = (phase: RoadmapPhase) => (
    <View key={phase.id} style={styles.phaseContainer}>
      <Text style={styles.phaseTitle}>{phase.title}</Text>
      {phase.items.map(renderRoadmapItem)}
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
        <Text style={styles.headerTitle}>Roadmap</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {phases.map(renderPhase)}
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
  phaseContainer: {
    marginVertical: 24,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  roadmapItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    overflow: 'hidden',
  },
  lockedItem: {
    opacity: 0.6,
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  lockedText: {
    color: '#9CA3AF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
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
