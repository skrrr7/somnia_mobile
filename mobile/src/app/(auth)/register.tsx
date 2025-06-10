import { View, Text, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../assets/styles/register.styles';
import LinearGradient from 'react-native-linear-gradient';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const backendUrl = 'http://192.168.1.12:4000';

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match!',
      });
      return;
    }
    setIsLoading(true);
    const userData = { email, password };
    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response.data.success) {
        Toast.show({ type: 'success', text1: 'Account created successfully!' });
        router.replace('/(auth)/login');
      } else {
        Toast.show({ type: 'error', text1: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      Toast.show({ type: 'error', text1: 'An error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
    colors={['#18192a', '#23395d', '#3578e5']}
      style={{ flex: 1 }}
    >
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/somnia.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.cardNew}>
        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <Pressable style={styles.tab} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.tabText}>Log In</Text>
          </Pressable>
          <View style={[styles.tab, styles.tabActive]}><Text style={styles.tabTextActive}>Sign Up</Text></View>
        </View>
        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputNew}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputNew}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputNew}
            placeholder="Enter password again"
            placeholderTextColor="#aaa"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#888" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        {/* Sign Up Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.loginButtonText}>{isLoading ? 'Loading...' : 'Sign Up'}</Text>
        </TouchableOpacity>
        <View style={styles.signUpSpacing} />
        
        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.socialBtnFull, { marginRight: 6 }]}> 
            <Image source={require('../../assets/images/google.png')} style={styles.socialIconFull} />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialBtnFull, { marginLeft: 6 }]}> 
            <Image source={require('../../assets/images/facebook.png')} style={styles.socialIconFull} />
            <Text style={styles.socialBtnText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}