import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../assets/styles/authcontainer.styles'

export default function AuthContainer({ children }) {
    return (
        <LinearGradient
            colors={['#1a1a2e', '#23234b']}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});