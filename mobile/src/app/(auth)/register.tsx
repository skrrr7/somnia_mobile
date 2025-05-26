import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { useRouter, Link } from 'expo-router'
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AuthContainer from '../../components/AuthContainer';
import AuthTextInputs from '../../components/AuthITextInputs';
import AuthPasswordInputs from '../../components/AuthPasswordInputs';
import styles from '../../assets/styles/register.styles';


export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Use localhost for web development
  const backendUrl = 'http://localhost:4000';

  const handleRegister = async () => {
    // Validation
    if (password !== confirmPassword) {
        Toast.show({
            type: 'success',
            text1: 'Passwords do not match!',
        });
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
        Toast.show({
            type: 'success',
            text1: 'Account created successfully!',
        });
        router.back();
      } else {
        Toast.show({
            type: 'success',
            text1: 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
        Toast.show({
            type: 'success',
            text1: 'An error occurred. Please try again later.',
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
        authTitleImg={require('../../assets/images/create-account.png')} 
        authType="Register" 
        authOnPress={handleRegister}
        authBtnLoading={isLoading}
        goToLink={
            <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
        } >
      <View style={styles.formContainer}>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <AuthTextInputs 
            icon="mail-outline" 
            placeHolder="Enter your email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" />

        {/* Username */}
        <Text style={styles.label}>name</Text>
        <AuthTextInputs 
            icon="person-outline" 
            placeHolder="Enter your username" 
            value={name} 
            onChangeText={setName} 
            keyboardType="default" />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <AuthPasswordInputs 
            icon="lock-closed-outline" 
            placeHolder="Enter your password" 
            value={password} 
            onChangeText={setPassword} />

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <AuthPasswordInputs 
            icon="lock-closed-outline" 
            placeHolder="Enter password again" 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} />
      </View>
    </AuthContainer>
  );
}