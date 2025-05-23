import { View, Text, TouchableOpacity, ScrollView, Modal, Platform, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../assets/styles/diary.styles.js';

export default function Diary() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Diary</Text>
      <Text style={styles.subtitle}>Track your sleep patterns and habits</Text>

      <View style={styles.entryContainer}>
        <TouchableOpacity style={styles.addEntryButton}>
          <Ionicons name="add-circle" size={24} color="#a259ff" />
          <Text style={styles.addEntryText}>Add New Entry</Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
  },
  entryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(162, 89, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
  },
  addEntryText: {
    color: '#a259ff',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  diaryForm: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  timePickerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  timePickerText: {
    fontSize: 16,
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(162, 89, 255, 0.2)',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  mealsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: 'rgba(162, 89, 255, 0.2)',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#fff',
  },
  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
  },
  saveButton: {
    backgroundColor: 'rgba(162, 89, 255, 0.8)',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
