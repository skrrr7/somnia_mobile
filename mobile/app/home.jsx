import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput, Modal, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import styles from '../assets/styles/home.styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('home');
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState('bedtime'); // 'bedtime' or 'wakeTime'
  const [diaryEntries, setDiaryEntries] = useState([]); // Store all diary entries
  const [diaryEntry, setDiaryEntry] = useState({
    date: new Date(),
    bedtime: new Date(),
    wakeTime: new Date(),
    sleepQuality: 'Rested',
    moodBeforeSleep: '😊',
    lifestyleFactors: {
      exercise: false,
      caffeine: false,
      alcohol: false,
      screenTime: '0-1 hour',
      stressLevel: 'Low',
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
      }
    },
    diaryNotes: '',
  });

  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      if (timePickerMode === 'bedtime') {
        setDiaryEntry({ ...diaryEntry, bedtime: selectedTime });
      } else {
        setDiaryEntry({ ...diaryEntry, wakeTime: selectedTime });
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDiaryEntry({ ...diaryEntry, date: selectedDate });
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSaveEntry = () => {
    // Add the new entry to the diary entries array
    setDiaryEntries([...diaryEntries, diaryEntry]);
    
    // Reset the form
    setDiaryEntry({
      date: new Date(),
      bedtime: new Date(),
      wakeTime: new Date(),
      sleepQuality: 'Rested',
      moodBeforeSleep: '😊',
      lifestyleFactors: {
        exercise: false,
        caffeine: false,
        alcohol: false,
        screenTime: '0-1 hour',
        stressLevel: 'Low',
        meals: {
          breakfast: false,
          lunch: false,
          dinner: false,
        }
      },
      diaryNotes: '',
    });
    
    // Close the modal
    setShowDiaryModal(false);
  };

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
        color: (opacity = 1) => `rgba(162, 89, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  // Function to get sleep recommendations
  const getSleepRecommendations = () => {
    const lastSleepHours = sleepData.datasets[0].data[sleepData.datasets[0].data.length - 1];
    const recommendations = [];

    // Sleep duration recommendations
    if (lastSleepHours < 6) {
      recommendations.push({
        title: 'Sleep Duration Alert',
        message: 'Your sleep duration is below the recommended minimum. Try to aim for 7-9 hours of sleep.',
        icon: 'warning-outline',
        color: '#ff4d6d'
      });
    } else if (lastSleepHours > 9) {
      recommendations.push({
        title: 'Oversleeping Notice',
        message: 'You\'re sleeping more than the recommended amount. While rest is important, too much sleep can affect your energy levels.',
        icon: 'information-circle-outline',
        color: '#ffd60a'
      });
    } else {
      recommendations.push({
        title: 'Good Sleep Duration',
        message: 'Your sleep duration is within the recommended range of 7-9 hours. Keep up the good work!',
        icon: 'checkmark-circle-outline',
        color: '#43e97b'
      });
    }

    // Sleep quality recommendations
    if (parseInt(sleepStats.sleepQuality) < 70) {
      recommendations.push({
        title: 'Sleep Quality Improvement',
        message: 'Your sleep quality could be improved. Consider establishing a consistent sleep schedule and creating a relaxing bedtime routine.',
        icon: 'moon-outline',
        color: '#5d3fd3'
      });
    } else {
      recommendations.push({
        title: 'Excellent Sleep Quality',
        message: 'Your sleep quality is excellent! Continue maintaining your healthy sleep habits.',
        icon: 'star-outline',
        color: '#ffd60a'
      });
    }

    // General sleep tips
    recommendations.push({
      title: 'Sleep Environment Tip',
      message: 'Keep your bedroom cool, dark, and quiet for optimal sleep conditions.',
      icon: 'home-outline',
      color: '#a259ff'
    });

    recommendations.push({
      title: 'Bedtime Routine',
      message: 'Try to maintain a consistent bedtime routine to signal your body it\'s time to sleep.',
      icon: 'time-outline',
      color: '#ff8c42'
    });

    return recommendations;
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

        {selectedTab === 'recommendations' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sleep Recommendations</Text>
            {getSleepRecommendations().map((rec, index) => (
              <View key={index} style={[styles.recommendationItem, { borderLeftColor: rec.color }]}>
                <Ionicons name={rec.icon} size={24} color={rec.color} style={styles.recommendationIcon} />
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <Text style={styles.recommendationMessage}>{rec.message}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 'diary' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sleep Diary</Text>
            <TouchableOpacity 
              style={styles.addDiaryButton}
              onPress={() => setShowDiaryModal(true)}
            >
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
              <Text style={styles.addDiaryButtonText}>Add New Entry</Text>
            </TouchableOpacity>

            {/* Display saved entries */}
            {diaryEntries.map((entry, index) => (
              <View key={index} style={styles.diaryEntry}>
                <Text style={styles.diaryEntryDate}>{formatDate(entry.date)}</Text>
                <View style={styles.diaryEntryTimes}>
                  <Text style={styles.diaryEntryTime}>Bedtime: {formatTime(entry.bedtime)}</Text>
                  <Text style={styles.diaryEntryTime}>Wake: {formatTime(entry.wakeTime)}</Text>
                </View>
                <Text style={styles.diaryEntryNotes}>{entry.diaryNotes}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Diary Modal */}
      <Modal
        visible={showDiaryModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Diary Entry</Text>
              <TouchableOpacity onPress={() => setShowDiaryModal(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.diaryForm}>
              {/* Date */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Date</Text>
                <TouchableOpacity
                  style={styles.timePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.timePickerText}>{formatDate(diaryEntry.date)}</Text>
                </TouchableOpacity>
                {/* iOS inline picker */}
                {showDatePicker && Platform.OS === 'ios' && (
                  <DateTimePicker
                    value={diaryEntry.date}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    style={{ backgroundColor: '#23234b' }}
                  />
                )}
              </View>

              {/* Bedtime */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Bedtime</Text>
                <TouchableOpacity
                  style={styles.timePickerButton}
                  onPress={() => {
                    setTimePickerMode('bedtime');
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timePickerText}>{formatTime(diaryEntry.bedtime)}</Text>
                </TouchableOpacity>
                {/* iOS inline picker */}
                {showTimePicker && Platform.OS === 'ios' && timePickerMode === 'bedtime' && (
                  <DateTimePicker
                    value={diaryEntry.bedtime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeChange}
                    style={{ backgroundColor: '#23234b' }}
                  />
                )}
              </View>

              {/* Wake Time */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Wake Time</Text>
                <TouchableOpacity
                  style={styles.timePickerButton}
                  onPress={() => {
                    setTimePickerMode('wakeTime');
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timePickerText}>{formatTime(diaryEntry.wakeTime)}</Text>
                </TouchableOpacity>
                {/* iOS inline picker */}
                {showTimePicker && Platform.OS === 'ios' && timePickerMode === 'wakeTime' && (
                  <DateTimePicker
                    value={diaryEntry.wakeTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeChange}
                    style={{ backgroundColor: '#23234b' }}
                  />
                )}
              </View>

              {/* Lifestyle Factors */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Lifestyle Factors</Text>
                
                {/* Exercise */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setDiaryEntry({
                    ...diaryEntry,
                    lifestyleFactors: {
                      ...diaryEntry.lifestyleFactors,
                      exercise: !diaryEntry.lifestyleFactors.exercise
                    }
                  })}
                >
                  <View style={[
                    styles.checkbox,
                    diaryEntry.lifestyleFactors.exercise && styles.checkboxSelected
                  ]}>
                    {diaryEntry.lifestyleFactors.exercise && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Did you exercise today?</Text>
                </TouchableOpacity>

                {/* Caffeine */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setDiaryEntry({
                    ...diaryEntry,
                    lifestyleFactors: {
                      ...diaryEntry.lifestyleFactors,
                      caffeine: !diaryEntry.lifestyleFactors.caffeine
                    }
                  })}
                >
                  <View style={[
                    styles.checkbox,
                    diaryEntry.lifestyleFactors.caffeine && styles.checkboxSelected
                  ]}>
                    {diaryEntry.lifestyleFactors.caffeine && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Had caffeine after 6 PM</Text>
                </TouchableOpacity>

                {/* Alcohol */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setDiaryEntry({
                    ...diaryEntry,
                    lifestyleFactors: {
                      ...diaryEntry.lifestyleFactors,
                      alcohol: !diaryEntry.lifestyleFactors.alcohol
                    }
                  })}
                >
                  <View style={[
                    styles.checkbox,
                    diaryEntry.lifestyleFactors.alcohol && styles.checkboxSelected
                  ]}>
                    {diaryEntry.lifestyleFactors.alcohol && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>Had alcohol today</Text>
                </TouchableOpacity>

                {/* Screen Time */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Screen Time Before Bed</Text>
                  <View style={styles.optionsContainer}>
                    {['0-1 hour', '1-2 hours', '2-3 hours', '3+ hours'].map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.optionButton,
                          diaryEntry.lifestyleFactors.screenTime === option && styles.optionButtonSelected
                        ]}
                        onPress={() => setDiaryEntry({
                          ...diaryEntry,
                          lifestyleFactors: {
                            ...diaryEntry.lifestyleFactors,
                            screenTime: option
                          }
                        })}
                      >
                        <Text style={styles.optionText}>{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Stress Level */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Stress Level</Text>
                  <View style={styles.optionsContainer}>
                    {['Low', 'Moderate', 'High', 'Very High'].map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          styles.optionButton,
                          diaryEntry.lifestyleFactors.stressLevel === level && styles.optionButtonSelected
                        ]}
                        onPress={() => setDiaryEntry({
                          ...diaryEntry,
                          lifestyleFactors: {
                            ...diaryEntry.lifestyleFactors,
                            stressLevel: level
                          }
                        })}
                      >
                        <Text style={styles.optionText}>{level}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Meals */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Meals Today</Text>
                  <View style={styles.mealsContainer}>
                    {Object.entries(diaryEntry.lifestyleFactors.meals).map(([meal, eaten]) => (
                      <TouchableOpacity
                        key={meal}
                        style={styles.checkboxContainer}
                        onPress={() => setDiaryEntry({
                          ...diaryEntry,
                          lifestyleFactors: {
                            ...diaryEntry.lifestyleFactors,
                            meals: {
                              ...diaryEntry.lifestyleFactors.meals,
                              [meal]: !eaten
                            }
                          }
                        })}
                      >
                        <View style={[
                          styles.checkbox,
                          eaten && styles.checkboxSelected
                        ]}>
                          {eaten && (
                            <Ionicons name="checkmark" size={20} color="#fff" />
                          )}
                        </View>
                        <Text style={styles.checkboxLabel}>{meal.charAt(0).toUpperCase() + meal.slice(1)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Diary Notes */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  multiline
                  placeholder="How was your day? Any thoughts before sleep?"
                  placeholderTextColor="#666"
                  value={diaryEntry.diaryNotes}
                  onChangeText={(text) => setDiaryEntry({ ...diaryEntry, diaryNotes: text })}
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEntry}
              >
                <Text style={styles.saveButtonText}>Save Entry</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Android pickers rendered outside the modal */}
      {showDatePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={diaryEntry.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={timePickerMode === 'bedtime' ? diaryEntry.bedtime : diaryEntry.wakeTime}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}

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