import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  formContainer: { marginBottom: 30 },
  label: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: "500",
  },
  labelContainer: {
    justifyContent: 'center',
  },
  createAccount: {
    height: 50,
    width: 250,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#ffffff',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    height: 48,
    color: '#000000',
  },
  eyeIcon: { padding: 8 },
  button: {
    backgroundColor: '#5d3fd3',
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: "600",
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#ccc', // or any color you like
    width: '100%',
    bottom: 0,
    left: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  footerText: {
    marginRight: 5,
    fontSize: 16,
    color: '#ffffff',
  },
  link: {
    fontWeight: "600",
    fontSize: 16,
    color: '#ffffff',
  },
});

export default styles;