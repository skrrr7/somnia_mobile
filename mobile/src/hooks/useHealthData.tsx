import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initialize, requestPermission, readRecords } from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

const useHealthData = (date: Date) => {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);

  // Android - Health Connect
  const readSampleData = async () => {
    // initialize the client
    const isInitialized = await initialize();
    if (!isInitialized) { return; }

    // request permissions
    await requestPermission([
      { accessType: 'read', recordType: 'Steps' },
    ]);

    const timeRangeFilter: TimeRangeFilter = {
      operator: 'between',
      startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
      endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
    };

    // Steps
    const stepsResult = await readRecords('Steps', { timeRangeFilter });
    console.log("Steps Result:", stepsResult); // Important: Inspect this object
    const totalSteps = stepsResult.records.reduce((sum, cur) => sum + cur.count, 0); // Access the records array
    setSteps(totalSteps);
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    readSampleData();
  }, [date]);

  return { steps };
};

export default useHealthData;