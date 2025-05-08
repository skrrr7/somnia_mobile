import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import { Ionicons} from '@expo/vector-icons';
import AuthContainer from './authcontainer';
import styles from '../../assets/styles/register.styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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

  const handleRegister = () => {}
  
  return (
    <AuthContainer>
        {/* Login Label */}
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
              onChange={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}/>
          </View>

          {/* Username */}
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name='person-outline'
              size={20}
              style={styles.inputIcon}>
            </Ionicons>
            <TextInput 
              placeholder='Enter your username' 
              placeholderTextColor={'#787878'}
              value={username}
              onChange={setUsername}
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
              onChange={setPassword}
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
              onChange={setConfirmPassword}
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

          {/* Login Button */}
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