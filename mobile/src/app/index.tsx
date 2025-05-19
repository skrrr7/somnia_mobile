import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Value from '../components/Value';
import useHealthData from '../hooks/useHealthData';

const Home = () => {
  const [date, setDate] = useState(new Date());
  const { steps } = useHealthData(date);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date); // Create a copy of the current date
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate);
  };

  return (
    <View>
      <Text>This values are static</Text>
      <Value label="Steps Count" value={steps.toString()} />
      <Value label="Latest Resting Heart Rate" value="0 pero static" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
