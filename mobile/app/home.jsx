import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from '../assets/styles/home.styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';

export default function Home() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('home');

  // Mock data for sleep statistics
  const sleepStats = {
    averageSleep: '7.5',
    sleepQuality: '85%',
    sleepStreak: '5 days',
  };

  // Example sleep data for the past 7 days
  const sleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [7, 6.5, 8, 7.5, 8.3, 7, 8],
        color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`, // Line color
        strokeWidth: 3,
      },
    ],
  };
  const screenWidth = Dimensions.get('window').width;

  // Stat boxes data
  const statBoxes = [
    { label: 'Calories Burned', value: '2,100', unit: 'kcal', icon: 'flame-outline', color: '#ff8c42' },
    { label: 'Steps', value: '8,200', unit: '', icon: 'walk-outline', color: '#43e97b' },
    { label: 'Sleep', value: '7.5', unit: 'hrs', icon: 'moon-outline', color: '#5d3fd3' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: 'heart-outline', color: '#ff4d6d' },
  ];

  return (
    <LinearGradient colors={['#1a1a2e', '#23234b']} style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/images/default-avatar.png')} style={styles.avatar} />
          <View>
            <Text style={styles.greeting}>Good evening,</Text>
            <Text style={styles.profileName}>John Doe</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setSelectedTab('profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {selectedTab === 'home' && (
          <>
            {/* Sleep Statistics */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sleep Statistics</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{sleepStats.averageSleep}</Text>
                  <Text style={styles.statLabel}>Avg. Hours</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{sleepStats.sleepQuality}</Text>
                  <Text style={styles.statLabel}>Quality</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{sleepStats.sleepStreak}</Text>
                  <Text style={styles.statLabel}>Streak</Text>
                </View>
              </View>
            </View>

            {/* Sleep Hours Graph */}
            <LineChart
              data={sleepData}
              width={screenWidth - 32}
              height={220}
              chartConfig={{
                backgroundColor: '#23234b',
                backgroundGradientFrom: '#23234b',
                backgroundGradientTo: '#1a1a2e',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#a259ff',
                },
              }}
              bezier
              style={{
                marginVertical: 16,
                borderRadius: 16,
                alignSelf: 'center',
              }}
            />

            {/* Stat Boxes Dashboard */}
            <View style={styles.statsBoxContainer}>
              {statBoxes.map((box, idx) => (
                <View key={idx} style={[styles.statBox, { backgroundColor: box.color + '22' }]}> 
                  <Ionicons name={box.icon} size={28} color={box.color} style={{ marginBottom: 6 }} />
                  <Text style={[styles.statBoxValue, { color: box.color }]}>{box.value} <Text style={styles.statBoxUnit}>{box.unit}</Text></Text>
                  <Text style={styles.statBoxLabel}>{box.label}</Text>
                </View>
              ))}
            </View>

          </>
        )}

        {selectedTab === 'profile' && (
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <Image 
                source={require('../assets/images/default-avatar.png')}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <View style={styles.settingsList}>
              <TouchableOpacity style={styles.settingItem}>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
                <Text style={styles.settingText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingItem}>
                <Ionicons name="moon-outline" size={24} color="#fff" />
                <Text style={styles.settingText}>Sleep Goals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingItem}>
                <Ionicons name="analytics-outline" size={24} color="#fff" />
                <Text style={styles.settingText}>Sleep Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={() => router.push('/')}
              >
                <Ionicons name="log-out-outline" size={24} color="#ff4444" />
                <Text style={[styles.settingText, { color: '#ff4444' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => setSelectedTab('home')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={selectedTab === 'home' ? 'home' : 'home-outline'} 
              size={24} 
              color={selectedTab === 'home' ? '#a259ff' : '#fff'} 
            />
            <Text style={[styles.navText, selectedTab === 'home' && styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setSelectedTab('profile')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={selectedTab === 'profile' ? 'person' : 'person-outline'} 
              size={24} 
              color={selectedTab === 'profile' ? '#a259ff' : '#fff'} 
            />
            <Text style={[styles.navText, selectedTab === 'profile' && styles.navTextActive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
} 