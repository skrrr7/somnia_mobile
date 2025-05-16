import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#1a1a2e', '#23234b']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Image
              source={require('../assets/images/somnia.png')}
              style={styles.logoOnly}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>
              Your personal sleep tracking and analysis companion. 
              Discover better sleep patterns and improve your overall well-being.
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureCard}>
              <Ionicons name="moon" size={22} color="#5d3fd3" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Sleep Tracking</Text>
              <Text style={styles.featureText}>
                Monitor your sleep patterns and get detailed insights
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="analytics" size={22} color="#5d3fd3" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Smart Analysis</Text>
              <Text style={styles.featureText}>
                Get personalized recommendations for better sleep
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Ionicons name="trending-up" size={22} color="#5d3fd3" style={styles.featureIcon} />
              <Text style={styles.featureTitle}>Progress Tracking</Text>
              <Text style={styles.featureText}>
                Track your sleep improvement journey
              </Text>
            </View>
          </View>

          {/* Buttons Container */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.getStartedButton,
                pressed && styles.getStartedButtonPressed,
              ]}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoOnly: {
    width: 300,
    height: 110,
    marginBottom: 12,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#bfc9db',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
    marginTop: 0,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'flex-start',
  },
  featureIcon: {
    marginBottom: 6,
    fontSize: 22,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 12,
  },
  getStartedButton: {
    backgroundColor: '#5d3fd3',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#5d3fd3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  getStartedButtonPressed: {
    backgroundColor: '#4b2fc9',
    transform: [{ scale: 0.97 }],
  },
  getStartedButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inlineHeading: {
    display: 'none',
  },
  title: {
    display: 'none',
  },
  inlineLogo: {
    display: 'none',
  },
});