import { Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../assets/styles/home.styles';

export default function BottomNav({ onPress, icon, iconColor, navName}) {

    return (
        <TouchableOpacity 
              style={styles.navItem}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={icon} 
                size={24} 
                color={iconColor} 
              />
              {navName}
        </TouchableOpacity>
    );
};