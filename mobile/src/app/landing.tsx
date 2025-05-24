import React from 'react';
import { View, Text, Pressable, ScrollView, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/rootStack';
import styles from '../assets/styles/index.styles';
import FeatureList from '../components/FeatureList';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

export default function LandingPage() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" translucent />
      <LinearGradient colors={['#1a1a2e', '#23234b']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.contentContainer}>
            <Image source={require('../assets/images/somnia.png')} style={styles.logoOnly} resizeMode="contain" />
            <Text style={styles.subtitle}>
              Your personal sleep tracking and analysis companion. 
              Discover better sleep patterns and improve your overall well-being.
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <FeatureList icon="moon" title="Sleep Tracking" text="Monitor your sleep patterns and get detailed insights" />
            <FeatureList icon="analytics" title="Smart Analysis" text="Get personalized recommendations for better sleep" />
            <FeatureList icon="trending-up" title="Progress Tracking" text="Track your sleep improvement journey" />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={({ pressed }) => [styles.getStartedButton, pressed && styles.getStartedButtonPressed]}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
