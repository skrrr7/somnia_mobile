<<<<<<< HEAD
import HeartRate from "../models/heartRateModel.js";
 
export const addHeartRate = async (req, res) => {
    const { lastModifiedTime, id, samples, startTime, endTime, userId } = req.body;
 
    if (!userId || !lastModifiedTime || !id || !samples || !startTime || !endTime) {
        return res.status(400).json({ success: false, message: 'Missing required details!' });
    }
 
    try {
        const heartRateData = new HeartRate({
            user: userId,
            id,
            lastModifiedTime: new Date(lastModifiedTime),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            samples
        });
 
        await heartRateData.save();
        return res.status(201).json({ success: true, message: "Heart rate data added successfully" });
 
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
=======
import HeartRate from '../models/heartRateModel.js';

export const addHeartRate = async (req, res) => {
  const records = req.body; // assuming array of heart rate records

  try {
    for (const record of records) {
      const { id, lastModifiedTime, startTime, endTime, samples, userId } = record;

      if (!id || !lastModifiedTime || !startTime || !endTime || !samples || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required details' });
      }

      // Upsert: update if exists, else create
      await HeartRate.findOneAndUpdate(
        { id },
        { user: userId, lastModifiedTime: new Date(lastModifiedTime), startTime: new Date(startTime), endTime: new Date(endTime), samples },
        { upsert: true, new: true }
      );
    }

    return res.status(200).json({ success: true, message: 'Heart rate data synced successfully' });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
>>>>>>> d4eb89d042084f702f50d394c47e685c34a2e95d
};
 