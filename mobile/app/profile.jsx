import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import styles from '../assets/styles/profile.styles.js';

export default function Profile() {
  const router = useRouter();
  return (
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
  );
}
