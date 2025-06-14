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
  Upload,
  Paperclip,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface AssignmentDetailsScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
  assignment?: {
    id: string;
    title: string;
    instructions: string;
    deadline: string;
  };
}

export const AssignmentDetailsScreen: React.FC<AssignmentDetailsScreenProps> = ({
  onNavigate,
  onBack,
  assignment = {
    id: '1',
    title: 'Math Assignment 1',
    instructions: 'Read the provided case study on sustainable agriculture in Cameroon. Analyze the challenges and opportunities, and propose innovative solutions for enhancing agricultural practices while minimizing environmental impact. Your proposal should include a detailed implementation plan, budget, and expected outcomes.',
    deadline: 'July 20, 2024, 11:59 PM',
  },
}) => {
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
        <Text style={styles.headerTitle}>Assignment Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instructions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>{assignment.instructions}</Text>
        </View>

        {/* Deadline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deadline</Text>
          <Text style={styles.deadlineText}>{assignment.deadline}</Text>
        </View>

        {/* Submission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submission</Text>
          
          <TouchableOpacity
            style={styles.submissionOption}
            onPress={() => onNavigate('submitAssignment', { assignment, type: 'upload' })}
            activeOpacity={0.7}
          >
            <View style={styles.submissionIcon}>
              <Upload size={20} color="#6B7280" />
            </View>
            <Text style={styles.submissionText}>Upload Fi...</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submissionOption}
            onPress={() => onNavigate('submitAssignment', { assignment, type: 'attach' })}
            activeOpacity={0.7}
          >
            <View style={styles.submissionIcon}>
              <Paperclip size={20} color="#6B7280" />
            </View>
            <Text style={styles.submissionText}>Attach Fi...</Text>
            <ChevronRight size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => onNavigate('submitAssignment', { assignment })}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Assignment</Text>
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
  instructionsText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  deadlineText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  submissionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  submissionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  submissionText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  submitContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
