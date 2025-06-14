import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { Button } from '../components/Button';
import { Colors } from '../constants/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive helper functions
const wp = (percentage: number) => {
  const value = (percentage * screenWidth) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

const hp = (percentage: number) => {
  const value = (percentage * screenHeight) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

const normalize = (size: number) => {
  const scale = screenWidth / 375; // Base width (iPhone X)
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

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
    paddingHorizontal: wp(6.4), // 24px on 375px screen
    paddingVertical: hp(4), // 32px on 800px screen
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: hp(45), // Minimum 45% of screen height
  },
  illustrationFrame: {
    width: wp(85.3), // 320px on 375px screen, scales responsively
    height: wp(85.3), // Keep it square
    maxWidth: 350, // Maximum size for larger screens
    maxHeight: 350,
    backgroundColor: Colors.white,
    borderRadius: normalize(24),
    marginBottom: hp(4), // 32px on 800px screen
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: normalize(4) },
    shadowOpacity: 0.1,
    shadowRadius: normalize(8),
    elevation: 5,
  },
  illustration: {
    width: wp(68.3), // 256px on 375px screen
    height: wp(68.3), // Keep it square
    maxWidth: 280,
    maxHeight: 280,
    backgroundColor: Colors.primary,
    borderRadius: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationInner: {
    width: wp(34.1), // 128px on 375px screen
    height: wp(34.1), // Keep it square
    maxWidth: 140,
    maxHeight: 140,
    backgroundColor: Colors.white,
    borderRadius: normalize(12),
    opacity: 0.9,
  },
  dot: {
    width: normalize(24),
    height: normalize(24),
    backgroundColor: Colors.white,
    borderRadius: normalize(12),
    position: 'absolute',
  },
  dotTopLeft: {
    top: normalize(32),
    left: normalize(32),
  },
  dotBottomRight: {
    bottom: normalize(32),
    right: normalize(32),
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: hp(6), // 48px on 800px screen
  },
  paginationDot: {
    width: normalize(8),
    height: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: '#D1D5DB',
    marginHorizontal: normalize(4),
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
  },
  textContainer: {
    marginBottom: hp(4), // 32px on 800px screen
    paddingHorizontal: wp(2.7), // 10px on 375px screen
  },
  title: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: hp(3), // 24px on 800px screen
    lineHeight: normalize(36),
  },
  description: {
    fontSize: normalize(16),
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: normalize(24),
    paddingHorizontal: wp(4.3), // 16px on 375px screen
  },
  buttonContainer: {
    paddingBottom: hp(4), // 32px on 800px screen
    paddingHorizontal: wp(2.7), // 10px on 375px screen for better button spacing
  },
  loginButtonContainer: {
    marginTop: hp(2), // 16px on 800px screen
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: normalize(14),
    color: '#6B7280',
    marginBottom: hp(1.5), // 12px on 800px screen
    textAlign: 'center',
  },
});
