import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  Shield,
  Star,
  Users,
  Trophy,
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../constants/colors';

const { width } = Dimensions.get('window');

interface Batch {
  id: string;
  name: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string[];
  icon: any;
  available: boolean;
}

interface BatchSelectionScreenProps {
  onNavigate: (screen: string, params?: any) => void;
  onBack: () => void;
}

export const BatchSelectionScreen: React.FC<BatchSelectionScreenProps> = ({
  onNavigate,
  onBack,
}) => {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const batches: Batch[] = [
    {
      id: 'fortitude',
      name: 'Fortitude',
      title: 'Batch of Fortitude',
      description: 'For the brave and determined students ready to overcome any challenge and achieve academic excellence.',
      features: [
        'Advanced Learning Modules',
        'Personalized Mentorship',
        'Exclusive Study Groups',
        'Priority Support Access',
        'Achievement Certificates',
      ],
      color: '#F59E0B',
      gradient: ['#FEF3C7', '#FCD34D'],
      icon: Shield,
      available: true,
    },
  ];

  const handleBatchSelect = (batch: Batch) => {
    if (!batch.available) return;
    
    setSelectedBatch(batch.id);
    
    // Animate selection
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to create account after a short delay
    setTimeout(() => {
      onNavigate('createAccount', { batch: batch.name });
    }, 300);
  };

  const renderBatch = (batch: Batch) => {
    const IconComponent = batch.icon;
    const isSelected = selectedBatch === batch.id;
    
    return (
      <Animated.View
        key={batch.id}
        style={[
          styles.batchCard,
          !batch.available && styles.disabledCard,
          isSelected && { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleBatchSelect(batch)}
          disabled={!batch.available}
          activeOpacity={0.9}
          style={styles.batchContent}
        >
          {/* Background Gradient Effect */}
          <View
            style={[
              styles.gradientBackground,
              { backgroundColor: batch.gradient[0] },
            ]}
          />
          
          {/* Header */}
          <View style={styles.batchHeader}>
            <View style={[styles.iconContainer, { backgroundColor: batch.color }]}>
              <IconComponent size={32} color={Colors.white} />
            </View>
            
            <View style={styles.batchTitleContainer}>
              <Text style={styles.batchName}>{batch.name}</Text>
              <Text style={styles.batchTitle}>{batch.title}</Text>
            </View>
            
            {batch.available ? (
              <ChevronRight size={24} color={batch.color} />
            ) : (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Soon</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={[
            styles.batchDescription,
            !batch.available && styles.disabledText,
          ]}>
            {batch.description}
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {batch.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureDot, { backgroundColor: batch.color }]} />
                <Text style={[
                  styles.featureText,
                  !batch.available && styles.disabledText,
                ]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          {/* Available Badge */}
          {batch.available && (
            <View style={[styles.availableBadge, { backgroundColor: batch.color }]}>
              <Text style={styles.availableText}>Available Now</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
        <Text style={styles.headerTitle}>Choose Your Batch</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to OpenDreams</Text>
          <Text style={styles.welcomeSubtitle}>
            Select your learning batch to begin your journey towards academic excellence
          </Text>
        </View>

        {/* Batches */}
        <View style={styles.batchesContainer}>
          {batches.map(renderBatch)}
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <Shield size={20} color="#F59E0B" />
          <Text style={styles.footerText}>
            Join the Batch of Fortitude and unlock your potential for academic excellence!
          </Text>
        </View>
      </ScrollView>
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
  welcomeSection: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  batchesContainer: {
    gap: 24,
    paddingBottom: 32,
  },
  batchCard: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  disabledCard: {
    opacity: 0.6,
  },
  batchContent: {
    position: 'relative',
    padding: 24,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    opacity: 0.3,
  },
  batchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  batchTitleContainer: {
    flex: 1,
  },
  batchName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  batchTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  batchDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
  },
  disabledText: {
    color: '#9CA3AF',
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  availableBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availableText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  comingSoonBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});
