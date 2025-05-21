import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from '../assets/styles/home.styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import Diary from './diary';
import SleepReco from './sleepReco';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('home');
ve
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

      <ScrollView style={styles.container}>
        {selectedTab === 'home' && (
          <>
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

        {selectedTab === 'recommendations' && <SleepReco />}
        {selectedTab === 'diary' && <Diary />}

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
            onPress={() => setSelectedTab('recommendations')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={selectedTab === 'recommendations' ? 'bulb' : 'bulb-outline'} 
              size={24} 
              color={selectedTab === 'recommendations' ? '#a259ff' : '#fff'} 
            />
            <Text style={[styles.navText, selectedTab === 'recommendations' && styles.navTextActive]}>Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => setSelectedTab('diary')}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={selectedTab === 'diary' ? 'journal' : 'journal-outline'} 
              size={24} 
              color={selectedTab === 'diary' ? '#a259ff' : '#fff'} 
            />
            <Text style={[styles.navText, selectedTab === 'diary' && styles.navTextActive]}>Diary</Text>
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