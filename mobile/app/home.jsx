import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('home');

  // Mock data for sleep statistics
  const sleepStats = {
    averageSleep: '7.5',
    sleepQuality: '85%',
    sleepStreak: '5 days',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SOMNiA</Text>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => setSelectedTab('profile')}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
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

            {/* Recent Sleep History */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Recent Sleep</Text>
              <View style={styles.historyItem}>
                <Text style={styles.historyDate}>Last Night</Text>
                <Text style={styles.historyDuration}>7h 30m</Text>
                <Text style={styles.historyQuality}>Good</Text>
              </View>
              <View style={styles.historyItem}>
                <Text style={styles.historyDate}>2 Days Ago</Text>
                <Text style={styles.historyDuration}>6h 45m</Text>
                <Text style={styles.historyQuality}>Fair</Text>
              </View>
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
                onPress={() => router.push('/')}>
                <Ionicons name="log-out-outline" size={24} color="#ff4444" />
                <Text style={[styles.settingText, { color: '#ff4444' }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setSelectedTab('home')}>
          <Ionicons 
            name={selectedTab === 'home' ? 'home' : 'home-outline'} 
            size={24} 
            color={selectedTab === 'home' ? '#5d3fd3' : '#fff'} 
          />
          <Text style={[styles.navText, selectedTab === 'home' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setSelectedTab('profile')}>
          <Ionicons 
            name={selectedTab === 'profile' ? 'person' : 'person-outline'} 
            size={24} 
            color={selectedTab === 'profile' ? '#5d3fd3' : '#fff'} 
          />
          <Text style={[styles.navText, selectedTab === 'profile' && styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2d2d2d',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'RussoOne',
  },
  profileButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'RussoOne',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5d3fd3',
    fontFamily: 'RussoOne',
  },
  statLabel: {
    color: '#888',
    marginTop: 5,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  historyDate: {
    color: '#fff',
    flex: 2,
  },
  historyDuration: {
    color: '#5d3fd3',
    flex: 1,
    textAlign: 'center',
  },
  historyQuality: {
    color: '#888',
    flex: 1,
    textAlign: 'right',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#888',
  },
  settingsList: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  settingText: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    paddingVertical: 10,
    paddingBottom: 30,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    marginTop: 5,
  },
  navTextActive: {
    color: '#5d3fd3',
  },
}); 