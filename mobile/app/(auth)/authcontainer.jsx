import { View, /* ImageBackground, */ Image, KeyboardAvoidingView, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../assets/styles/authcontainer.styles'

export default function AuthContainer({ children }) {
    return (
        <LinearGradient colors={['#6C3FC5', '#1a1a2e']} style={styles.background}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/logo-glow-transparent.png')}
                        style={styles.backgroundLogo} />

                    <LinearGradient 
                        colors={['rgba(108, 63, 197, 0.85)', 'rgba(44, 62, 80, 0.85)']}
                        style={styles.absoluteFill} />
                    
                    <View style={styles.authContents}>
                        {/* Auth Contents */}
                        <View style={styles.appNameContainer}>
                            <Image 
                                source={require('../../assets/images/somnia.png')}
                                resizeMode='contain'
                                style={styles.appName} />
                        </View>

                        {/* Inject content from other screens */}
                        {children}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
      );
}