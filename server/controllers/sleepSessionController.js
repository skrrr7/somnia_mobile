<<<<<<< HEAD
<<<<<<< HEAD
import SleepSession from '../models/SleepSession.js';
import mongoose from 'mongoose';
=======
import SleepSession from '../models/sleepSessionModel.js';
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6

export const addSleepSession = async(req,res) =>{
  const {stages, lastModifiedTime, id, title, startTime, endTime} = req.body;
  const userId = req.body.userId;

  if(!stages || !lastModifiedTime || !id || !title || !startTime || !endTime){
    return res.status(400).json({sucess: false, message: 'Missing required details'});
  }

<<<<<<< HEAD
export default sleepController;
=======
import SleepSession from '../models/sleepSessionModel.js';

export const addSleepSession = async(req,res) =>{
  const {stages, lastModifiedTime, id, title, startTime, endTime} = req.body;
  const userId = req.body.userId;

  if(!stages || !lastModifiedTime || !id || !title || !startTime || !endTime){
    return res.status(400).json({sucess: false, message: 'Missing required details'});
  }

=======
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
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
<<<<<<< HEAD
}
>>>>>>> ca24ff9c3e81bf121923869272d60b633f134d5a
=======
}
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
