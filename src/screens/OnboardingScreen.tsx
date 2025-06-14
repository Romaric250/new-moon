import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';

interface OnboardingScreenProps {
  onNext: () => void;
  onLogin?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext, onLogin }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header with illustration */}
        <View style={styles.illustrationContainer}>
          {/* Placeholder for the illustration - you can replace this with an actual image */}
          <View style={styles.illustrationFrame}>
            <View style={styles.illustration}>
              <View style={styles.illustrationInner} />
              <View style={[styles.dot, styles.dotTopLeft]} />
              <View style={[styles.dot, styles.dotBottomRight]} />
            </View>
          </View>

          {/* Pagination dots */}
          <View style={styles.pagination}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Welcome to OpenDreams
          </Text>
          <Text style={styles.description}>
            OpenDreams is an exclusive online learning platform for high-achieving Cameroonian
            students. We provide access to top-tier educational resources and a supportive
            community to help you reach your full potential.
          </Text>
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={onNext}
            variant="primary"
            size="lg"
            fullWidth
          />

          {onLogin && (
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginPrompt}>Already have an account?</Text>
              <Button
                title="Log In"
                onPress={onLogin}
                variant="outline"
                size="md"
                fullWidth
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationFrame: {
    width: 320,
    height: 320,
    backgroundColor: Colors.white,
    borderRadius: 24,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  illustration: {
    width: 256,
    height: 256,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationInner: {
    width: 128,
    height: 128,
    backgroundColor: Colors.white,
    borderRadius: 12,
    opacity: 0.9,
  },
  dot: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    position: 'absolute',
  },
  dotTopLeft: {
    top: 32,
    left: 32,
  },
  dotBottomRight: {
    bottom: 32,
    right: 32,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 48,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
  },
  textContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingBottom: 32,
  },
  loginButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    textAlign: 'center',
  },
});
