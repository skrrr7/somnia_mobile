import { RecordResult } from "react-native-health-connect";

const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
  
    return `${hours}:${minutes}-${day}/${month}/${year}`;
};

// const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

 
 const backendUrl = 'http://192.168.254.142:4000'
  
export const syncToDB = async (
    heartRate: RecordResult<"HeartRate">[],
    sleepSession: RecordResult<"SleepSession">[],
    steps: RecordResult<"Steps">[],
    userID: String) => {
        try {
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
        
            await fetch(backendUrl + "/api/sleepSession/addSleepSession", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(heartRatePayload),
            });
        
            // Map and post sleep session data
            // const sleepPayload = sleepSession.map((record) => ({
            //   userId: userID,
            //   id: record.metadata.id,
            //   lastModifiedTime: formatDate(record.metadata.lastModifiedTime),
            //   startTime: formatDate(record.startTime),
            //   endTime: formatDate(record.endTime),
            //   title: record.title || null,
            //   stages: (record.stages || []).map((stage) => ({
            //     startTime: formatDate(stage.startTime),
            //     endTime: formatDate(stage.endTime),
            //     stage: stage.stage,
            //   })),
            // }));
        
            // await fetch( backendUrl + "/api/sleepSession/addSleepSession", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json"
            //   },
            //   body: JSON.stringify(sleepPayload),
            // });
        
            // // Map and post steps data
            // const stepsPayload = steps.map((record) => ({
            //   userId: userID, // <-- FIXED
            //   id: record.metadata.id,
            //   lastModifiedTime: formatDate(record.metadata.lastModifiedTime),
            //   startTime: formatDate(record.startTime),
            //   endTime: formatDate(record.endTime),
            //   count: record.count,
            // }));
        
            // await fetch("http://192.168.254.142:4000/api/step/addStep", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json"
            //   },
            //   body: JSON.stringify(stepsPayload),
            // });
        
            console.log("Health data synced successfully.");
            console.log(heartRate);
          } catch (error) {
            console.error("Error syncing data:", error);
          }

    return;
}