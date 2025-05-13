import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter, Link } from 'expo-router'
import { useFonts } from 'expo-font';
import { Ionicons} from '@expo/vector-icons';
import AuthContainer from './authcontainer';
import styles from '../../assets/styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'RussoOne': require('../../assets/fonts/RussoOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Use localhost for web development
  const backendUrl = 'http://localhost:4000';

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
        toast.success('Login successful!');
        router.replace('/home'); // Changed from push to replace to prevent going back to login
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContainer>
        {/* Login Label */}
        <View style={styles.formContainer}>
          <View style={styles.loginLabel}>
            <Image 
              source={require('../../assets/images/login.png')}
              resizeMode='contain' 
              style={styles.login} />
          </View>

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name='mail-outline'
              size={20}
              style={styles.inputIcon}>
            </Ionicons>
            <TextInput 
              placeholder='Enter your email' 
              placeholderTextColor={'#787878'}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}/>
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name='lock-closed-outline'
              size={20}
              style={styles.inputIcon}>
            </Ionicons>
            <TextInput 
              placeholder='Enter your password' 
              placeholderTextColor={'#787878'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input} />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)} 
              style={styles.eyeIcon}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20} />
            </TouchableOpacity>
          </View>
          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.button} >
              {isLoading ? (<ActivityIndicator color='#ffffff' />) : (<Text style={styles.buttonText}>Login</Text>)}
          </TouchableOpacity>

          <View style={styles.bottomLine} />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
    </AuthContainer>
  );
}