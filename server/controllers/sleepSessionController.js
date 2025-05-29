import SleepSession from '../models/sleepSessionModel.js';
<<<<<<< HEAD
 
export const addSleepSession = async(req,res) =>{
  const {stages, lastModifiedTime, id, title, startTime, endTime} = req.body;
  const userId = req.body.userId;
 
  if(!stages || !lastModifiedTime || !id || !title || !startTime || !endTime){
    return res.status(400).json({sucess: false, message: 'Missing required details'});
=======

export const addSleepSession = async (req, res) => {
  const sleepSessions = req.body; // expecting an array of sleep session objects

  if (!Array.isArray(sleepSessions) || sleepSessions.length === 0) {
    return res.status(400).json({ success: false, message: 'Request body must be a non-empty array' });
>>>>>>> d4eb89d042084f702f50d394c47e685c34a2e95d
  }
 
  try {
<<<<<<< HEAD
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
=======
    for (const session of sleepSessions) {
      const { stages, lastModifiedTime, id, title, startTime, endTime, userId } = session;

      if (
        !Array.isArray(stages) ||
        !lastModifiedTime ||
        !id ||
        !startTime ||
        !endTime ||
        !userId
      ) {
        return res.status(400).json({ success: false, message: 'Missing required details in one or more sessions' });
      }

      await SleepSession.findOneAndUpdate(
        { id },
        {
          user: userId,
          stages,
          lastModifiedTime: new Date(lastModifiedTime),
          id,
          title: title || null,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    return res.status(200).json({ success: true, message: 'Sleep Session data synced successfully' });
>>>>>>> d4eb89d042084f702f50d394c47e685c34a2e95d
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
