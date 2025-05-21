import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Value from '../components/Value';
import { initialize } from 'react-native-health-connect';
import { useBloodPressure } from '../hooks/useBloodPressure';
import { useExerciseSession } from '../hooks/useExerciseSession';
import { useHeartRate } from '../hooks/useHeartRate';
import { useRestingHeartRate } from '../hooks/useRestingHeartRate';
import { useSleepSession } from '../hooks/useSleepSession';
import { useSteps } from '../hooks/useSteps';

const Home = () => {
  const { readBloodPressure } = useBloodPressure(new Date('2025-05-21'));
  const { readExerciseSession } = useExerciseSession(new Date('2025-05-21'));
  const { readHeartRate } = useHeartRate(new Date('2025-05-21'));
  const { readRestingHeartRate} = useRestingHeartRate(new Date('2025-05-21'));
  const { readSleepSession } = useSleepSession(new Date('2025-05-21'));
  const { readSteps } = useSteps(new Date('2025-05-21'));

  const [bpCount, setBpCount] = useState(0);
  const [exerSession, setExerSession] = useState(0);
  const [heartRate, setheartRate] = useState(0);
  const [restingHeartRate, setrestingHeartRate] = useState(0);
  const [sleepCount, setSleepCount] = useState(0);
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const fetchHealthData = async () => {
      const isInitialized = await initialize();

      if (!isInitialized) {
        throw new Error('CLIENT_NOT_INITIALIZED');
      }

      const bloodPressure = await readBloodPressure();
      const exerciseSession = await readExerciseSession();
      const heartRate = await readHeartRate();
      const restingHeartRate = await readRestingHeartRate();
      const sleep = await readSleepSession();
      const steps = await readSteps();

      setBpCount(bloodPressure.length);
      setExerSession(exerciseSession.length);
      setheartRate(heartRate.length);
      setrestingHeartRate(restingHeartRate.length);
      setSleepCount(sleep.length);
      setSteps(steps.length);
    };

    fetchHealthData();
  }, [readBloodPressure, readExerciseSession, readHeartRate, readRestingHeartRate,  readSleepSession, readSteps]);

  return (
    <View>
      <Value label="Blood Pressure Records" value={bpCount.toString()} />
      <Value label="Exercise Records" value={exerSession.toString()} />
      <Value label="Heart Rate Records" value={heartRate.toString()} />
      <Value label="Resting Heart Rate Records" value={restingHeartRate.toString()} />
      <Value label="Sleep Sessions" value={sleepCount.toString()} />
      <Value label="Steps Records" value={steps.toString()} />
    </View>
  );
};

export default Home;
