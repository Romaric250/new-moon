import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Search,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
  Menu,
} from 'lucide-react-native';

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
      className="w-[48%] rounded-2xl mb-4 overflow-hidden"
      style={{ backgroundColor: course.color }}
      onPress={() => onNavigate('courseDetails', { course })}
      activeOpacity={0.7}
    >
      <View className="h-30 justify-center items-center">
        <View className="w-4/5 h-4/5 justify-center items-center">
          {course.image === 'math' && (
            <Text className="text-xs text-gray-700 text-left leading-3.5">
              {`sin(θ) = a/h\nsin θ = 1/2\nsin² x + cos² x = 1\ntan x = sin x/cos x\nlog₂8 = 3`}
            </Text>
          )}
          {course.image === 'reading' && (
            <View className="w-15 h-20 bg-white rounded p-2 shadow-md">
              <View className="h-2 bg-gray-200 rounded-sm mb-1.5" />
              <View className="h-1 bg-gray-100 rounded-sm mb-1" />
              <View className="h-1 bg-gray-100 rounded-sm mb-1" />
              <View className="h-1 bg-gray-100 rounded-sm mb-1" />
              <View className="h-1 bg-gray-100 rounded-sm" />
            </View>
          )}
          {course.image === 'writing' && (
            <View className="flex-row items-center justify-around w-full">
              <View className="w-1 h-10 bg-yellow-500 rounded-sm" />
              <View className="w-5 h-7.5 bg-green-500 rounded-2xl" />
            </View>
          )}
          {course.image === 'test1' && (
            <View className="items-center justify-center">
              <View className="w-12.5 h-15 bg-white rounded shadow-md" />
            </View>
          )}
          {course.image === 'test2' && (
            <View className="items-center justify-center">
              <View className="w-12.5 h-15 bg-white rounded shadow-md" />
              <View className="w-5 h-1 bg-yellow-500 rounded-sm absolute bottom-2.5" />
            </View>
          )}
        </View>
      </View>
      <View className="p-4">
        <Text className="text-sm font-semibold text-gray-900 mb-1">{course.title}</Text>
        <Text className="text-xs text-gray-600">{course.instructor}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">My Courses</Text>
        <TouchableOpacity className="p-2">
          <Menu size={24} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
          <Search size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-3 text-base text-gray-900"
            placeholder="Search courses"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* In Progress Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">In progress</Text>
          <View className="flex-row flex-wrap justify-between">
            {inProgressCourses.map(renderCourseCard)}
          </View>
        </View>

        {/* Completed Section */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Completed</Text>
          <View className="flex-row flex-wrap justify-between">
            {completedCourses.map(renderCourseCard)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-gray-200 pb-8">
        <View className="flex-row py-3 px-4 pt-4">
          {bottomTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                className="flex-1 items-center py-3 px-2 min-h-[60px]"
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
      </View>
    </SafeAreaView>
  );
};


