import { View, /* ImageBackground, */ Image, KeyboardAvoidingView, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../assets/styles/authcontainer.styles'

export default function AuthContainer({ children }) {
    return (
        <View style={[styles.background, { backgroundColor: '#000' }]}> 
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/logo-glow-transparent.png')}
                        style={styles.backgroundLogo} />

                    <LinearGradient 
                        colors={['rgba(93, 63, 211, 0.6)', 'rgba(44, 62, 80, 0.6)']}
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
        </View>
      );
}