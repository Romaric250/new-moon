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
    paddingTop: hp(2), // Reduced top padding
    paddingBottom: hp(2), // Reduced bottom padding
  },
  illustrationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3), // Fixed padding instead of flex
    minHeight: hp(35), // Reduced minimum height
    maxHeight: hp(45), // Maximum height to prevent overflow
  },
  illustrationFrame: {
    width: wp(70), // Reduced from 85.3% to 70%
    height: wp(70), // Keep it square
    maxWidth: 280, // Reduced maximum size
    maxHeight: 280,
    backgroundColor: Colors.white,
    borderRadius: normalize(20), // Slightly smaller border radius
    marginBottom: hp(2), // Reduced margin
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: normalize(4) },
    shadowOpacity: 0.1,
    shadowRadius: normalize(8),
    elevation: 5,
  },
  illustration: {
    width: wp(55), // Reduced from 68.3% to 55%
    height: wp(55), // Keep it square
    maxWidth: 220, // Reduced maximum size
    maxHeight: 220,
    backgroundColor: Colors.primary,
    borderRadius: normalize(14), // Slightly smaller
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustrationInner: {
    width: wp(27), // Reduced from 34.1% to 27%
    height: wp(27), // Keep it square
    maxWidth: 110, // Reduced maximum size
    maxHeight: 110,
    backgroundColor: Colors.white,
    borderRadius: normalize(10), // Slightly smaller
    opacity: 0.9,
  },
  dot: {
    width: normalize(20), // Slightly smaller
    height: normalize(20),
    backgroundColor: Colors.white,
    borderRadius: normalize(10),
    position: 'absolute',
  },
  dotTopLeft: {
    top: normalize(24), // Adjusted position
    left: normalize(24),
  },
  dotBottomRight: {
    bottom: normalize(24), // Adjusted position
    right: normalize(24),
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: hp(3), // Reduced from 6% to 3%
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
    marginBottom: hp(3), // Reduced from 4% to 3%
    paddingHorizontal: wp(2), // Reduced padding
  },
  title: {
    fontSize: normalize(26), // Reduced from 30 to 26
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: hp(2), // Reduced from 3% to 2%
    lineHeight: normalize(32), // Adjusted line height
  },
  description: {
    fontSize: normalize(15), // Slightly reduced from 16 to 15
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: normalize(22), // Adjusted line height
    paddingHorizontal: wp(3), // Reduced from 4.3% to 3%
  },
  buttonContainer: {
    paddingBottom: hp(3), // Reduced from 4% to 3%
    paddingHorizontal: wp(2), // Reduced padding
    marginTop: 'auto', // Push to bottom
  },
  loginButtonContainer: {
    marginTop: hp(1.5), // Reduced from 2% to 1.5%
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: normalize(13), // Slightly reduced
    color: '#6B7280',
    marginBottom: hp(1), // Reduced from 1.5% to 1%
    textAlign: 'center',
  },
});
