import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import styles from '../assets/styles/home.styles';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import { LineChart } from 'react-native-chart-kit';
import SleepReco from './sleepReco';
import Diary from './diary';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('home');
    // Example sleep data for the past 7 days
    const sleepData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [7, 6.5, 8, 7.5, 8.3, 7, 8],
          color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`,
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
  
        <ScrollView>
          {/* The problem is here */}
        </ScrollView>
  
        {/* Bottom Navigation */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            <BottomNav 
              onPress={() => setSelectedTab('home')} 
              icon={selectedTab === 'home' ? 'home' : 'home-outline'} 
              iconColor={selectedTab === 'home' ? '#a259ff' : '#fff'} 
              navName={<Text style={[styles.navText, selectedTab === 'home' && styles.navTextActive]}>Home</Text>} />
            <BottomNav 
              onPress={() => setSelectedTab('recommendations')} 
              icon={selectedTab === 'recommendations' ? 'bulb' : 'bulb-outline'} 
              iconColor={selectedTab === 'recommendations' ? '#a259ff' : '#fff'} 
              navName={<Text style={[styles.navText, selectedTab === 'recommendations' && styles.navTextActive]}>Tips</Text>} />
            <BottomNav 
              onPress={() => setSelectedTab('diary')} 
              icon={selectedTab === 'diary' ? 'journal' : 'journal-outline'} 
              iconColor={selectedTab === 'diary' ? '#a259ff' : '#fff'} 
              navName={<Text style={[styles.navText, selectedTab === 'diary' && styles.navTextActive]}>Diary</Text>} />
            <BottomNav 
              onPress={() => setSelectedTab('profile')} 
              icon={selectedTab === 'profile' ? 'person' : 'person-outline'} 
              iconColor={selectedTab === 'profile' ? '#a259ff' : '#fff'} 
              navName={<Text style={[styles.navText, selectedTab === 'profile' && styles.navTextActive]}>Profile</Text>} />
          </View>
        </View>
      </LinearGradient>
    );
}