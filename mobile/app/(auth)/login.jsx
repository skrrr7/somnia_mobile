import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react'
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons/Ionicons';
import AuthContainer from './authcontainer';
import styles from '../../assets/styles/login.styles';
import { VITE_BACKEND_URL } from '@env';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Use localhost for web development
  const backendUrl = VITE_BACKEND_URL;

  const handleLogin = async () => {
    setIsLoading(true);

    // Create user data object
    const userData = { 
      email, 
      password 
    };

    try {
      // Send POST request to the backend to login
      const response = await axios.post(`${backendUrl}/api/auth/login`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Handle successful login
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Login successful!'
        });
        navigation.replace('Home'); // Changed from router.replace to navigation.replace
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'An error occurred. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)} 
            style={styles.eyeIcon}>
              <Ionicons 
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
}