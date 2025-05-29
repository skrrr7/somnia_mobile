import SleepSession from '../models/sleepSessionModel.js';
 
export const addSleepSession = async(req,res) =>{
  const {stages, lastModifiedTime, id, title, startTime, endTime} = req.body;
  const userId = req.body.userId;
 
  if(!stages || !lastModifiedTime || !id || !title || !startTime || !endTime){
    return res.status(400).json({sucess: false, message: 'Missing required details'});
  }
 
  try {
    const sleepData = new SleepSession({
      user: userId,
      stages,
      lastModifiedTime: new Date(lastModifiedTime),
      id,
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    });
 
    await sleepData.save();
 
    return res.status(200).json({ success: true, message: 'Sleep Session data successfully added' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}