import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        margin: 20,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0px 0px 150px rgb(1, 1, 1)',
    },
    backgroundLogo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    absoluteFill: { ...StyleSheet.absoluteFillObject },
    authContents: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },
    appNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    appName: { height: 60 },
});

export default styles;