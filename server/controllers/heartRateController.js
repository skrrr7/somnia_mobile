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
};
 