import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import styles from '../assets/styles/home.styles';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import { LineChart } from 'react-native-chart-kit';
import SleepReco from './sleepReco';
import Diary from './diary';
import { initialize } from 'react-native-health-connect';
import { useSteps } from '../hooks/useSteps';

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const { readSteps } = useSteps(new Date());
  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    const fetchHealthData = async () => {
      const isInitialized = await initialize();

      if (!isInitialized) {
        throw new Error('CLIENT_NOT_INITIALIZED');
      }

      // Steps
      const steps = await readSteps();
      const totalSteps = steps.reduce((sum, record) => sum + (record.count || 0), 0);
      // const stepMap = steps.reduce((map, record) => {
      //   const key = `${record.startTime}-${record.endTime}`;
      //   const count = record.count || 0;
      
      //   if (!map.has(key) || count > map.get(key)) {
      //     map.set(key, count);
      //   }
      
      //   return map;
      // }, new Map());
      
      // const totalSteps = Array.from(stepMap.values()).reduce((sum, count) => sum + count, 0);
      setTotalSteps(totalSteps);      
    };

    fetchHealthData();
  }, [readSteps]);

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
  

  
    // Stat boxes data
    const statBoxes = [
      { label: 'Calories Burned', value: '2,100', unit: 'kcal', icon: 'flame-outline', color: '#ff8c42' },
      { label: 'Total Steps Today', value: totalSteps, unit: '', icon: 'walk-outline', color: '#43e97b' },
      { label: 'Sleep', value: '7.5', unit: 'hrs', icon: 'moon-outline', color: '#5d3fd3' },
      { label: 'Latest Heart Rate', value: '72', unit: 'bpm', icon: 'heart-outline', color: '#ff4d6d' },
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
  
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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