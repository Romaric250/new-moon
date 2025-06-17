import React from 'react';
import {
  View,
  Text,
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
        return <Circle size={20} color="#F2BD24" />;
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
        return '#F2BD24';
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
      className={`bg-white rounded-xl border border-gray-200 mb-3 overflow-hidden ${
        item.status === 'locked' ? 'opacity-60' : ''
      }`}
      onPress={() => {
        if (item.status !== 'locked') {
          onNavigate('stepDetails', { step: item });
        }
      }}
      activeOpacity={item.status === 'locked' ? 1 : 0.7}
    >
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          {getStatusIcon(item.status)}
          <Text
            className={`text-base font-semibold ml-3 flex-1 ${
              item.status === 'locked' ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            {item.title}
          </Text>
        </View>
        <Text
          className="text-xs font-medium mb-2"
          style={{ color: getStatusColor(item.status) }}
        >
          {getStatusText(item.status)}
        </Text>
        {item.progress && (
          <View className="mt-2">
            <Text className="text-xs text-gray-600 mb-2">{item.progress}% Complete</Text>
            <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${item.progress}%` }}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderPhase = (phase: RoadmapPhase) => (
    <View key={phase.id} className="my-6">
      <Text className="text-lg font-bold text-gray-900 mb-4">{phase.title}</Text>
      {phase.items.map(renderRoadmapItem)}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <TouchableOpacity
          className="p-2 -ml-2"
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Roadmap</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {phases.map(renderPhase)}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row bg-white border-t border-gray-200 py-3 px-4">
        {bottomTabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <TouchableOpacity
              key={tab.id}
              className="flex-1 items-center py-2"
              onPress={() => onNavigate(tab.id)}
              activeOpacity={0.7}
            >
              <IconComponent
                size={24}
                color={tab.active ? '#F2BD24' : '#6B7280'}
              />
              <Text
                className="text-xs font-medium mt-1"
                style={{ color: tab.active ? '#F2BD24' : '#6B7280' }}
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


