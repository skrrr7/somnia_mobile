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
  login: {
    height: 50,
    width: 100,
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