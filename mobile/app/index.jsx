import { StyleSheet, View, Text } from "react-native"
import { Link } from "expo-router"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>

      <Link href="/(auth)/register">Register</Link>
      <Link href="/(auth)/login">Login</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});