import { RecordResult } from "react-native-health-connect";
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${hours}:${minutes}-${day}/${month}/${year}`;
};

const backendUrl = 'http://192.168.254.142:4000';

const handleResponse = async (response: Response, dataType: string) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to sync ${dataType} data: ${errorData.message || response.statusText}`);
    }
    return response.json();
};

const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        throw error;
    }
};
  
export const syncToDB = async (
    heartRate: RecordResult<"HeartRate">[],
    sleepSession: RecordResult<"SleepSession">[],
    steps: RecordResult<"Steps">[],
    userID: String) => {
        try {
            const token = await getAuthToken();
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            // Map and post heart rate data
            const heartRatePayload = heartRate.map((record) => ({
              userId: userID,
              id: record.metadata.id,
              lastModifiedTime: formatDate(record.metadata.lastModifiedTime),
              startTime: formatDate(record.startTime),
              endTime: formatDate(record.endTime),
              samples: record.samples.map((s) => ({
                beatsPerMinute: s.beatsPerMinute,
                time: formatDate(s.time),
              })),
            }));
        
            const heartRateResponse = await fetch(backendUrl + "/api/heartRate/addHeartRate", {
              method: "POST",
              headers,
              body: JSON.stringify(heartRatePayload),
            });
            await handleResponse(heartRateResponse, "heart rate");
        
            // Map and post sleep session data
            const sleepPayload = sleepSession.map((record) => ({
              userId: userID,
              id: record.metadata.id,
              lastModifiedTime: formatDate(record.metadata.lastModifiedTime),
              startTime: formatDate(record.startTime),
              endTime: formatDate(record.endTime),
              title: record.title || null,
              stages: (record.stages || []).map((stage) => ({
                startTime: formatDate(stage.startTime),
                endTime: formatDate(stage.endTime),
                stage: stage.stage,
              })),
            }));
        
            const sleepResponse = await fetch(backendUrl + "/api/sleepSession/addSleepSession", {
              method: "POST",
              headers,
              body: JSON.stringify(sleepPayload),
            });
            await handleResponse(sleepResponse, "sleep session");
        
            // Map and post steps data
            const stepsPayload = steps.map((record) => ({
              userId: userID,
              id: record.metadata.id,
              lastModifiedTime: formatDate(record.metadata.lastModifiedTime),
              startTime: formatDate(record.startTime),
              endTime: formatDate(record.endTime),
              count: record.count,
            }));
        
            const stepsResponse = await fetch(backendUrl + "/api/step/addStep", {
              method: "POST",
              headers,
              body: JSON.stringify(stepsPayload),
            });
            await handleResponse(stepsResponse, "steps");
        
            console.log("Health data synced successfully.");
          } catch (error) {
            console.error("Error syncing data:", error);
            throw error;
          }
}