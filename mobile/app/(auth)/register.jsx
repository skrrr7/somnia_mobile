import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import { Ionicons} from '@expo/vector-icons';
import AuthContainer from './authcontainer';
import styles from '../../assets/styles/register.styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleRegister = async () => {
    // Validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    // Create user data object
    const userData = { 
      name: name,
      email, 
      password 
    };

    try {
      // Send POST request to the backend to register the user
      const response = await axios.post(`${backendUrl}/api/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // Handle successful registration
      if (response.data.success) {
        toast.success('Account created successfully!');
        router.back(); // Go back to login page
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <View style={styles.formContainer}>
        <View style={styles.loginLabel}>
          <Image 
            source={require('../../assets/images/create-account.png')}
            resizeMode='contain' 
            style={styles.createAccount} />
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

        {/* Username */}
        <Text style={styles.label}>name</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name='person-outline'
            size={20}
            style={styles.inputIcon}>
          </Ionicons>
          <TextInput 
            placeholder='Enter your name' 
            placeholderTextColor={'#787878'}
            value={name}
            onChangeText={setName}
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

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name='lock-closed-outline'
            size={20}
            style={styles.inputIcon}>
          </Ionicons>
          <TextInput 
            placeholder='Enter password again' 
            placeholderTextColor={'#787878'}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.input} />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)} 
            style={styles.eyeIcon}>
              <Ionicons 
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={20} />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          style={styles.button} >
            {isLoading ? (<ActivityIndicator color='#ffffff' />) : (<Text style={styles.buttonText}>Create Account</Text>)}
        </TouchableOpacity>


        <View style={styles.bottomLine} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthContainer>
  );
}