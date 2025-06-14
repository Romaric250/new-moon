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
  Play,
  FileText,
  CheckSquare,
  Square,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface Resource {
  id: string;
  title: string;
  type: 'Video' | 'Document';
  icon: any;
}

interface ActionItem {
  id: string;
  title: string;
  completed: boolean;
}

interface StepDetailsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  step?: {
    id: string;
    title: string;
    objective: string;
  };
}

export const StepDetailsScreen: React.FC<StepDetailsScreenProps> = ({
  onNavigate,
  onBack,
  step = {
    id: '1',
    title: 'Step 1',
    objective: 'Understand the basics of the OpenDreams platform and how to navigate its features.',
  },
}) => {
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: '1',
      title: 'Watch the welcome video',
      completed: true,
    },
    {
      id: '2',
      title: 'Read the navigation guide',
      completed: false,
    },
  ]);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Welcome to OpenDreams',
      type: 'Video',
      icon: Play,
    },
    {
      id: '2',
      title: 'Platform Navigation Guide',
      type: 'Document',
      icon: FileText,
    },
  ];

  const toggleActionItem = (itemId: string) => {
    setActionItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const allItemsCompleted = actionItems.every(item => item.completed);

  const handleMarkComplete = () => {
    // Mark step as complete and navigate back
    onBack();
  };

  const renderResource = (resource: Resource) => {
    const IconComponent = resource.icon;
    
    return (
      <TouchableOpacity
        key={resource.id}
        style={styles.resourceItem}
        activeOpacity={0.7}
      >
        <View style={styles.resourceIcon}>
          <IconComponent size={20} color="#6B7280" />
        </View>
        <View style={styles.resourceContent}>
          <Text style={styles.resourceTitle}>{resource.title}</Text>
          <Text style={styles.resourceType}>{resource.type}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderActionItem = (item: ActionItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.actionItem}
      onPress={() => toggleActionItem(item.id)}
      activeOpacity={0.7}
    >
      {item.completed ? (
        <CheckSquare size={20} color={Colors.primary} />
      ) : (
        <Square size={20} color="#6B7280" />
      )}
      <Text style={[
        styles.actionItemText,
        item.completed && styles.completedText,
      ]}>
        {item.title}
      </Text>
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
        <Text style={styles.headerTitle}>{step.title}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Objective Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Objective</Text>
          <Text style={styles.objectiveText}>{step.objective}</Text>
        </View>

        {/* Resources Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          {resources.map(renderResource)}
        </View>

        {/* Action Items Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Items</Text>
          {actionItems.map(renderActionItem)}
        </View>
      </ScrollView>

      {/* Mark Complete Button */}
      <View style={styles.completeContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            !allItemsCompleted && styles.disabledButton,
          ]}
          onPress={handleMarkComplete}
          disabled={!allItemsCompleted}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.completeButtonText,
            !allItemsCompleted && styles.disabledButtonText,
          ]}>
            Mark as Complete
          </Text>
        </TouchableOpacity>
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
  objectiveText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  resourceType: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionItemText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  completeContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  completeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
});
