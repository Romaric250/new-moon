import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import {
  Search,
  Home as HomeIcon,
  BookOpen,
  Users,
  User,
  Filter,
  Star,
  Clock,
  CheckCircle,
  Play,
  MoreHorizontal,
  TrendingUp,
  Award,
  Calendar,
  X,
} from 'lucide-react-native';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress?: number;
  status: 'in-progress' | 'completed' | 'not-started';
  color: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  studentsCount: number;
  category: string;
  lastAccessed?: string;
  nextLesson?: string;
}

interface LearnScreenProps {
  onNavigate: (screen: string, params?: any) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const allCourses: Course[] = [
    {
      id: '1',
      title: 'SAT Math Mastery',
      instructor: 'Dr. Njoya',
      progress: 68,
      status: 'in-progress',
      color: '#EEF2FF',
      image: 'math',
      difficulty: 'Intermediate',
      duration: '12 weeks',
      rating: 4.8,
      studentsCount: 1247,
      category: 'Mathematics',
      lastAccessed: '2 hours ago',
      nextLesson: 'Quadratic Functions',
    },
    {
      id: '2',
      title: 'Critical Reading & Analysis',
      instructor: 'Dr. Mbella',
      progress: 45,
      status: 'in-progress',
      color: '#FEF3C7',
      image: 'reading',
      difficulty: 'Advanced',
      duration: '10 weeks',
      rating: 4.9,
      studentsCount: 892,
      category: 'English',
      lastAccessed: '1 day ago',
      nextLesson: 'Literary Devices',
    },
    {
      id: '3',
      title: 'Essay Writing Excellence',
      instructor: 'Dr. Ewane',
      progress: 82,
      status: 'in-progress',
      color: '#ECFDF5',
      image: 'writing',
      difficulty: 'Intermediate',
      duration: '8 weeks',
      rating: 4.7,
      studentsCount: 654,
      category: 'Writing',
      lastAccessed: '3 hours ago',
      nextLesson: 'Conclusion Strategies',
    },
    {
      id: '4',
      title: 'SAT Practice Test Series',
      instructor: 'Dr. Njoya',
      progress: 100,
      status: 'completed',
      color: '#D1FAE5',
      image: 'test1',
      difficulty: 'Advanced',
      duration: '6 weeks',
      rating: 4.6,
      studentsCount: 1156,
      category: 'Test Prep',
      lastAccessed: '1 week ago',
    },
    {
      id: '5',
      title: 'College Application Essays',
      instructor: 'Dr. Mbella',
      progress: 100,
      status: 'completed',
      color: '#BFDBFE',
      image: 'test2',
      difficulty: 'Advanced',
      duration: '4 weeks',
      rating: 4.9,
      studentsCount: 743,
      category: 'Writing',
      lastAccessed: '2 weeks ago',
    },
    {
      id: '6',
      title: 'Physics Fundamentals',
      instructor: 'Dr. Kamga',
      status: 'not-started',
      color: '#FDF2F8',
      image: 'physics',
      difficulty: 'Beginner',
      duration: '14 weeks',
      rating: 4.5,
      studentsCount: 432,
      category: 'Science',
    },
  ];

  // Filter and search functionality
  const filteredCourses = useMemo(() => {
    let filtered = allCourses;

    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(course => course.status === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.difficulty.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const getStatusCounts = () => {
    return {
      all: allCourses.length,
      'in-progress': allCourses.filter(c => c.status === 'in-progress').length,
      completed: allCourses.filter(c => c.status === 'completed').length,
      'not-started': allCourses.filter(c => c.status === 'not-started').length,
    };
  };

  const statusCounts = getStatusCounts();

  const bottomTabs = [
    { id: 'home', title: 'Home', icon: HomeIcon, active: false },
    { id: 'learn', title: 'Courses', icon: BookOpen, active: true },
    { id: 'community', title: 'Community', icon: Users, active: false },
    { id: 'profile', title: 'Profile', icon: User, active: false },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} color="#10B981" />;
      case 'in-progress':
        return <Play size={16} color="#F59E0B" />;
      default:
        return <Clock size={16} color="#6B7280" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCourseCard = (course: Course) => (
    <TouchableOpacity
      key={course.id}
      className="bg-white rounded-3xl mb-4 overflow-hidden shadow-lg border border-gray-100"
      onPress={() => onNavigate('courseDetails', { course })}
      activeOpacity={0.95}
    >
      {/* Header with status and menu */}
      <View className="flex-row justify-between items-center p-4 pb-2">
        <View className="flex-row items-center">
          {getStatusIcon(course.status)}
          <Text className="ml-2 text-xs font-medium text-gray-600 capitalize">
            {course.status.replace('-', ' ')}
          </Text>
        </View>
        <TouchableOpacity className="p-1">
          <MoreHorizontal size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Course visual */}
      <View
        className="mx-4 rounded-2xl h-32 justify-center items-center mb-4"
        style={{ backgroundColor: course.color }}
      >
        <View className="w-4/5 h-4/5 justify-center items-center">
          {course.image === 'math' && (
            <View className="items-center">
              <Text className="text-2xl mb-2">📐</Text>
              <Text className="text-xs text-gray-700 text-center font-mono">
                f(x) = ax² + bx + c
              </Text>
            </View>
          )}
          {course.image === 'reading' && (
            <View className="items-center">
              <Text className="text-2xl mb-2">📚</Text>
              <View className="w-16 h-12 bg-white rounded p-2 shadow-sm">
                <View className="h-1.5 bg-gray-300 rounded mb-1" />
                <View className="h-1 bg-gray-200 rounded mb-1" />
                <View className="h-1 bg-gray-200 rounded" />
              </View>
            </View>
          )}
          {course.image === 'writing' && (
            <View className="items-center">
              <Text className="text-2xl mb-2">✍️</Text>
              <View className="flex-row items-center">
                <View className="w-1 h-8 bg-blue-500 rounded-full mr-2" />
                <View className="w-4 h-6 bg-green-500 rounded-lg" />
              </View>
            </View>
          )}
          {(course.image === 'test1' || course.image === 'test2') && (
            <View className="items-center">
              <Text className="text-2xl mb-2">📝</Text>
              <View className="w-12 h-14 bg-white rounded shadow-sm border border-gray-200" />
            </View>
          )}
          {course.image === 'physics' && (
            <View className="items-center">
              <Text className="text-2xl mb-2">⚛️</Text>
              <Text className="text-xs text-gray-700 text-center font-mono">
                E = mc²
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Course info */}
      <View className="px-4 pb-4">
        <View className="flex-row items-start justify-between mb-2">
          <Text className="text-base font-bold text-gray-900 flex-1 mr-2" numberOfLines={2}>
            {course.title}
          </Text>
          <View className={`px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
            <Text className="text-xs font-medium">{course.difficulty}</Text>
          </View>
        </View>

        <Text className="text-sm text-gray-600 mb-3">{course.instructor}</Text>

        {/* Progress bar for in-progress courses */}
        {course.status === 'in-progress' && course.progress !== undefined && (
          <View className="mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-xs text-gray-500">Progress</Text>
              <Text className="text-xs font-semibold text-gray-700">{course.progress}%</Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className="h-full bg-primary rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </View>
            {course.nextLesson && (
              <Text className="text-xs text-gray-500 mt-1">Next: {course.nextLesson}</Text>
            )}
          </View>
        )}

        {/* Course stats */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text className="text-xs text-gray-600 ml-1">{course.rating}</Text>
            <Text className="text-xs text-gray-400 ml-2">({course.studentsCount})</Text>
          </View>
          <View className="flex-row items-center">
            <Calendar size={12} color="#6B7280" />
            <Text className="text-xs text-gray-600 ml-1">{course.duration}</Text>
          </View>
        </View>

        {/* Last accessed for in-progress courses */}
        {course.status === 'in-progress' && course.lastAccessed && (
          <Text className="text-xs text-gray-400 mt-2">Last accessed {course.lastAccessed}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">My Learning</Text>
            <Text className="text-sm text-gray-600">
              {statusCounts['in-progress']} in progress • {statusCounts.completed} completed
            </Text>
          </View>
          <TouchableOpacity className="p-2 bg-gray-50 rounded-xl">
            <TrendingUp size={24} color="#F59E0B" />
          </TouchableOpacity>
        </View>

        {/* Enhanced Search Bar */}
        <View className="flex-row items-center space-x-3">
          <View className="flex-1 flex-row items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
            <Search size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder="Search courses, instructors, topics..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} className="ml-2">
                <X size={18} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="p-3 bg-primary rounded-2xl"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Pills */}
      {showFilters && (
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <Text className="text-sm font-semibold text-gray-700 mb-3">Filter by status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {[
                { key: 'all', label: 'All Courses', count: statusCounts.all },
                { key: 'in-progress', label: 'In Progress', count: statusCounts['in-progress'] },
                { key: 'completed', label: 'Completed', count: statusCounts.completed },
                { key: 'not-started', label: 'Not Started', count: statusCounts['not-started'] },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  onPress={() => setSelectedFilter(filter.key as any)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFilter === filter.key
                      ? 'bg-primary border-primary'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`text-sm font-medium ${
                    selectedFilter === filter.key ? 'text-white' : 'text-gray-700'
                  }`}>
                    {filter.label} ({filter.count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Results Summary */}
      {(searchQuery.length > 0 || selectedFilter !== 'all') && (
        <View className="px-6 py-3 bg-blue-50 border-b border-blue-100">
          <Text className="text-sm text-blue-700">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            {searchQuery.length > 0 && ` for "${searchQuery}"`}
          </Text>
        </View>
      )}

      {/* Course Grid */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {filteredCourses.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {filteredCourses.map(renderCourseCard)}
          </View>
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <BookOpen size={48} color="#D1D5DB" />
            <Text className="text-lg font-semibold text-gray-500 mt-4 mb-2">No courses found</Text>
            <Text className="text-sm text-gray-400 text-center px-8">
              {searchQuery.length > 0
                ? `No courses match "${searchQuery}". Try adjusting your search.`
                : 'No courses match the selected filter.'
              }
            </Text>
            {(searchQuery.length > 0 || selectedFilter !== 'all') && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                className="mt-4 px-6 py-2 bg-primary rounded-full"
              >
                <Text className="text-white font-medium">Clear filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {/* Enhanced Bottom Navigation */}
      <View className="bg-white border-t border-gray-100 pb-8 shadow-lg">
        <View className="flex-row py-2 px-4 pt-4">
          {bottomTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TouchableOpacity
                key={tab.id}
                className={`flex-1 items-center py-3 px-2 min-h-[60px] rounded-2xl mx-1 ${
                  tab.active ? 'bg-primary/10' : ''
                }`}
                onPress={() => onNavigate(tab.id)}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={24}
                  color={tab.active ? '#F2BD24' : '#6B7280'}
                />
                <Text
                  className={`text-xs font-medium mt-1 ${
                    tab.active ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {tab.title}
                </Text>
                {tab.active && (
                  <View className="w-1 h-1 bg-primary rounded-full mt-1" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};


