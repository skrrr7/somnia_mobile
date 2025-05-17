import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// This is a temporary component.
const Value = ({ label, value }) => (
    <View style={{ marginBottom: 8 }}>
      <Text>{label}</Text>
      <Text>{value}</Text>
    </View>
  );

const Home = () => {
  return (
    <View>
        <Text>This values are static</Text>
      <Value label="Steps Count" value={0} />
      <Value label="Latest Resting Heart Rate" value={"90 bpm"} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})