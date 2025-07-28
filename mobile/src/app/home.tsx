import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useContext} from 'react';
import styles from '../assets/styles/home.styles';
import LinearGradient from 'react-native-linear-gradient';
import BottomNav from '../components/BottomNav';
import { LineChart } from 'react-native-chart-kit';
import SleepReco from './sleepReco';
import Diary from './diary';
import Profile from './profile';
import { ExerciseType, SleepStageType, RecordResult } from 'react-native-health-connect';
import { useExerciseSession } from '../hooks/useExerciseSession';
import { initialize } from 'react-native-health-connect';
import { useHeartRate } from '../hooks/useHeartRate';
import { useSleepSession } from '../hooks/useSleepSession';
import { useSteps } from '../hooks/useSteps';
import { syncToDB } from '../utils/syncToDB';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;

export default function Home() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const { readExerciseSession } = useExerciseSession(new Date());
  // sample Date '2025-05-29'
  const { readHeartRate } = useHeartRate(new Date());
  const { readSleepSession } = useSleepSession(new Date());
  const { readSteps } = useSteps(new Date());
  const [heartRateData, setHeartRateData] = useState([]);
  const [sleepDataRaw, setSleepDataRaw] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [exerSession, setExerSession] = useState("");
  const [exerType, setExerType] = useState("");
  const [latestHeartRate, setLatestHeartRate] = useState(0);
  const [totalSleepHours, setTotalSleepHours] = useState("");
  const [totalSteps, setTotalSteps] = useState(0);
  const [sleepData, setSleepData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  });
  
  useEffect(() => {
    const fetchHealthData = async () => {
      const authDataString = await AsyncStorage.getItem('authData');
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        setUserData({
          name: authData.name || 'User',
          email: authData.email || ''
        });
      }

      const isInitialized = await initialize();

      if (!isInitialized) {
        throw new Error('CLIENT_NOT_INITIALIZED');
      }
      
      // Steps
      const steps = await readSteps();
      setStepsData(steps);
      const totalSteps = steps.reduce((sum, record) => sum + (record.count || 0), 0);
      setTotalSteps(totalSteps);
      
      // Exercise
      const exerciseSession = await readExerciseSession();
      if (exerciseSession.length > 0) {
        const lastExercise = exerciseSession.sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())[0];
        const start = new Date(lastExercise.startTime);
        const end = new Date(lastExercise.endTime);
        const totalExerciseMs = end.getTime() - start.getTime();
        const totalMinutes = Math.floor(totalExerciseMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        let formattedExercise = '';

        if (hours > 0) {
          formattedExercise = `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else {
          formattedExercise = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
        
        setExerSession(formattedExercise);

        const getExerciseName = (value: number): string | undefined => {
          return Object.keys(ExerciseType).find(
            (key) => ExerciseType[key as keyof typeof ExerciseType] === value
          );
        };
        const exerciseName = getExerciseName(exerciseSession[0].exerciseType);
        setExerType(exerciseName || 'Unknown');
      }
      
      // Heart Rate
      const heartRate = await readHeartRate();
      setHeartRateData(heartRate);
      if (heartRate.length > 0 && heartRate[0].samples.length > 0) {
        setLatestHeartRate(heartRate[0].samples[0].beatsPerMinute);
      }

      // Sleep Session
      const sleep = await readSleepSession();
      setSleepDataRaw(sleep);
      // console.log(sleep[0].sta);
      const start = new Date(sleep[0].startTime);
      const end = new Date(sleep[0].endTime);
      const totalSleepMs = end.getTime() - start.getTime();
      const totalMinutes = Math.floor(totalSleepMs / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedSleep = `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
      setTotalSleepHours(formattedSleep);

      // Sleep Graph
      const labels: string[] = [];
      const data: number[] = [];
      const sleepStages = sleep.flatMap(session => session.stages || []);

      const getStageValue = (value: number): number => {
        switch (value) {
          case SleepStageType.AWAKE: return 1;
          case SleepStageType.LIGHT: return 2;
          case SleepStageType.DEEP: return 3;
          case SleepStageType.REM: return 4;
          default: return 0;
        }
      };

      sleepStages.forEach((stage) => {
        const start = new Date(stage.startTime);
        const hour = start.getHours();
        const minute = String(start.getMinutes()).padStart(2, '0');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        labels.push(`${displayHour}:${minute} ${ampm}`);
        const numericValue = getStageValue(stage.stage);
        data.push(numericValue);
      });

      setSleepData({
        labels,
        datasets: [
          {
            data,
            color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`,
            strokeWidth: 0, // Remove line
          },
        ],
      });
    };

    fetchHealthData();
  }, []);

  const [selectedTab, setSelectedTab] = useState('home');

  const statBoxes = [
    { label: exerSession, value: exerType, unit: '', icon: 'barbell-outline', color: '#ff8c42' },
    { label: 'Total Steps Today', value: totalSteps, unit: '', icon: 'walk-outline', color: '#43e97b' },
    { label: 'Hours of Sleep', value: totalSleepHours, unit: '', icon: 'moon-outline', color: '#5d3fd3' },
    { label: 'Latest Heart Rate', value: latestHeartRate, unit: 'bpm', icon: 'heart-outline', color: '#ff4d6d' },
  ];

  return (
    <LinearGradient colors={['#1a1a2e', '#23234b']} style={styles.background}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={require('../assets/images/default-avatar.png')} style={styles.avatar} />
          <View>
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.profileName}>{userData.name}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setSelectedTab('profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 16 }}>
        <Text style={{
          color: 'skyblue',
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 8,
        }}>
          Sleep Stages Throughout the Night
        </Text>
      </View>
        {selectedTab === 'home' && (
          <>
            {sleepData.labels.length > 0 && (
              <ScrollView horizontal>
                
                <LineChart
                  data={sleepData}
                  width={Math.max(screenWidth, sleepData.labels.length * 60)}
                  height={250}
                  chartConfig={{
                    backgroundColor: '#23234b',
                    backgroundGradientFrom: '#23234b',
                    backgroundGradientTo: '#1a1a2e',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#a259ff',
                    },
                  }}
                  withInnerLines={false}
                  withOuterLines={false}
                  withShadow={false}
                  withVerticalLines={false}
                  withHorizontalLabels={true}
                  fromZero
                  yLabelsOffset={20}
                  yAxisLabel=""
                  formatYLabel={(value) => {
                    const stageNum = parseInt(value);
                    switch (stageNum) {
                      case 1: return 'AWAKE';
                      case 2: return 'LIGHT';
                      case 3: return 'DEEP';
                      case 4: return 'REM';
                      default: return '';
                    }
                  }}
                  style={{
                    marginVertical: 16,
                    borderRadius: 16,
                    alignSelf: 'center',
                  }}
                />
              </ScrollView>
            )}

            <View style={styles.statsBoxContainer}>
              {statBoxes.map((box, idx) => (
                <View key={idx} style={[styles.statBox, { backgroundColor: box.color + '22' }]}> 
                  <Ionicons name={box.icon} size={28} color={box.color} style={{ marginBottom: 6 }} />
                  <Text style={[styles.statBoxValue, { color: box.color }]}>{box.value} <Text style={styles.statBoxUnit}>{box.unit}</Text></Text>
                  <Text style={styles.statBoxLabel}>{box.label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.syncButton}
              onPress={async () => {

                await syncToDB(heartRateData, sleepDataRaw, stepsData, "68832672731725ac9a4373bc");
              }}>
              <Text style={styles.syncButtonText}>Sync data to database</Text>
            </TouchableOpacity>
          </>
        )}

        {selectedTab === 'recommendations' && <SleepReco />}
        {selectedTab === 'diary' && <Diary />}
        {selectedTab === 'profile' && <Profile />}
      </ScrollView>

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