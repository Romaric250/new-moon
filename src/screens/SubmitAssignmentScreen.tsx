import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {
  X,
  Upload,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

interface SubmitAssignmentScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onClose: () => void;
  assignment?: {
    id: string;
    title: string;
  };
}

export const SubmitAssignmentScreen: React.FC<SubmitAssignmentScreenProps> = ({
  onNavigate,
  onClose,
  assignment = {
    id: '1',
    title: 'Math Assignment 1',
  },
}) => {
  const [assignmentText, setAssignmentText] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleChooseFile = () => {
    // Simulate file selection
    Alert.alert(
      'File Selection',
      'File selection would open here in a real app',
      [{ text: 'OK' }]
    );
    setSelectedFile('assignment_document.pdf');
  };

  const handleSubmit = () => {
    if (!assignmentText.trim() && !selectedFile) {
      Alert.alert(
        'Submission Required',
        'Please either upload a file or write your assignment text.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Assignment Submitted',
      'Your assignment has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            onNavigate('submittedAssignments');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <X size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Assignment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload your assignment</Text>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleChooseFile}
            activeOpacity={0.7}
          >
            <Upload size={20} color="#6B7280" />
            <Text style={styles.uploadButtonText}>
              {selectedFile || 'Choose file'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Text Input Section */}
        <View style={styles.section}>
          <Text style={styles.orText}>Or, write your assignment directly here:</Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="Type your assignment here..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={10}
            value={assignmentText}
            onChangeText={setAssignmentText}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
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
  closeButton: {
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    padding: 24,
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  orText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    fontSize: 16,
    color: '#111827',
    minHeight: 200,
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
