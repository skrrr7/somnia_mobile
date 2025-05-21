import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
import { RecordResult } from 'react-native-health-connect';

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [restingHeartRate, setRestingHeartRate] = useState(0);
  const [sleep, setSleep] = useState<RecordResult<'SleepSession'>[]>([]);
  const [steps, setSteps] = useState(0);

  const readHealthData = async () => {
    // Initialize health connect client
    const isInitialized = await initialize();
    if (!isInitialized) { return; }

    const timeRangeFilter: TimeRangeFilter = {
      operator: 'between',
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
    };

    // request permissions
    // Todo: ask user to set all permission otherwise add fallback
    await requestPermission([
      { accessType: 'read', recordType: 'BloodPressure' },
      { accessType: 'read', recordType: 'ExerciseSession' },
      { accessType: 'read', recordType: 'HeartRate' },
      { accessType: 'read', recordType: 'RestingHeartRate' },
      { accessType: 'read', recordType: 'SleepSession' },
      { accessType: 'read', recordType: 'Steps' }
    ]);

    // Get todays data
    const bloodPressureResult = await readRecords('BloodPressure', { timeRangeFilter });
    const exerciseResult = await readRecords('ExerciseSession', { timeRangeFilter });
    const heartRateResult = await readRecords('HeartRate', { timeRangeFilter });
    const restHeartRateResult = await readRecords('RestingHeartRate', { timeRangeFilter });
    const sleepResult = await readRecords('SleepSession', { timeRangeFilter });
    const stepsResult = await readRecords('Steps', { timeRangeFilter });

    // Sleep
    setSleep(sleepResult.records);

    // Steps
    const totalSteps = stepsResult.records.reduce((sum, cur) => sum + cur.count, 0); // Access the records array
    setSteps(totalSteps);
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    readHealthData();
  }, [date]);

  return { bloodPressure, exercise, heartRate, restingHeartRate, sleep, steps };
};

export default useHealthData; 