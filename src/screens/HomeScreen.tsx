import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { Colors } from '../constants/colors';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome back!
          </Text>
          <Text style={styles.subtitle}>
            Ready to continue your learning journey?
          </Text>
        </View>

        {/* Content */}
        <View style={styles.centerContent}>
          <BookOpen size={64} color={Colors.primary} />
          <Text style={styles.appName}>
            Project Moon
          </Text>
          <Text style={styles.description}>
            Your e-learning platform is ready!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
