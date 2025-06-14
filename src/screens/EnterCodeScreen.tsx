import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { X } from 'lucide-react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Colors } from '../constants/colors';
import {
  getResponsiveStyles,
  createEntranceAnimation,
  createExitAnimation,
  createButtonPressAnimation,
  getResponsiveAnimationConfig,
  screenDimensions
} from '../utils';

interface EnterCodeScreenProps {
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export const EnterCodeScreen: React.FC<EnterCodeScreenProps> = ({
  onClose,
  onSubmit
}) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(getResponsiveAnimationConfig().slideDistance)).current;
  const scaleAnim = useRef(new Animated.Value(getResponsiveAnimationConfig().scaleFrom)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const responsiveStyles = getResponsiveStyles();

  useEffect(() => {
    // Enhanced entrance animation
    createEntranceAnimation(fadeAnim, slideAnim, scaleAnim).start();
  }, []);

  const handleSubmit = async () => {
    if (code.length < 6) return;

    // Button press animation
    createButtonPressAnimation(buttonScaleAnim).start();

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSubmit(code);
    }, 1500);
  };

  const handleClose = () => {
    // Enhanced exit animation
    createExitAnimation(fadeAnim, slideAnim, scaleAnim).start(() => {
      onClose();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ],
            },
          ]}
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.7}
          >
            <X size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.title}>Enter Code</Text>
          <View style={styles.placeholder} />
        </View>

          {/* Content */}
          <ScrollView
            style={styles.formContainer}
            contentContainerStyle={styles.formContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Text style={[styles.subtitle, responsiveStyles.subtitle]}>
              Enter your admission code
            </Text>

            <View style={styles.inputContainer}>
              <Input
                label=""
                value={code}
                onChangeText={setCode}
                placeholder="XXXXXX"
                keyboardType="default"
                autoCapitalize="characters"
                testID="admission-code-input"
              />
            </View>

            <Text style={[styles.helpText, responsiveStyles.description]}>
              This code was sent to your email address.
            </Text>
          </ScrollView>

          {/* Enhanced Submit Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                transform: [{ scale: buttonScaleAnim }],
              },
            ]}
          >
            <Button
              title="Submit"
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={code.length < 6}
            />
          </Animated.View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: screenDimensions.width > 400 ? 32 : 24,
    paddingVertical: screenDimensions.height > 700 ? 24 : 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingTop: screenDimensions.height > 700 ? 32 : 24,
    paddingBottom: 20,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: screenDimensions.width > 400 ? 28 : 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: screenDimensions.height > 700 ? 40 : 32,
    lineHeight: screenDimensions.width > 400 ? 36 : 32,
  },
  inputContainer: {
    marginBottom: screenDimensions.height > 700 ? 24 : 16,
  },
  helpText: {
    fontSize: screenDimensions.width > 400 ? 16 : 14,
    color: '#6B7280',
    lineHeight: screenDimensions.width > 400 ? 24 : 20,
  },
  buttonContainer: {
    paddingBottom: screenDimensions.height > 700 ? 40 : 32,
    paddingTop: 16,
  },
});
