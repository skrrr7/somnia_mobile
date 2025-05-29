import Step from "../models/stepsModel.js";
<<<<<<< HEAD
 
export const addStepData = async (req,res) =>{
  const {id, lastModifiedTime, count, startTime, endTime} = req.body;
  const userId = req.body.userId;
 
  if(!id || !lastModifiedTime || !count || !startTime || !endTime){
    return res.status(400).json({success: false, message: 'Missing required details'});
=======

export const addStepData = async (req, res) => {
  const steps = req.body; // expecting an array of step objects

  if (!Array.isArray(steps) || steps.length === 0) {
    return res.status(400).json({ success: false, message: 'Request body must be a non-empty array' });
>>>>>>> d4eb89d042084f702f50d394c47e685c34a2e95d
  }
 
  try {
<<<<<<< HEAD
    const existingStep = await Step.findOne({ id });
 
    if(existingStep){
      return res.status(400).json({success : false, message: "Step data  with this ID already exists"});
    }
    const StepData = new Step({
      user: userId,
      id,
      lastModifiedTime: new Date(lastModifiedTime),
      count,
      startTime: new Date(startTime),
      endTime: new Date(endTime)
    })
    await StepData.save();
   
    return res.status(201).json({ success: true, message: "Step data added successfully" });
 
=======
    for (const step of steps) {
      const { id, lastModifiedTime, count, startTime, endTime, userId } = step;

      if (!id || !lastModifiedTime || !count || !startTime || !endTime || !userId) {
        return res.status(400).json({ success: false, message: 'Missing required details in one or more steps' });
      }

      await Step.findOneAndUpdate(
        { id },
        {
          user: userId,
          id,
          lastModifiedTime: new Date(lastModifiedTime),
          count,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    return res.status(200).json({ success: true, message: "Step data synced successfully" });
>>>>>>> d4eb89d042084f702f50d394c47e685c34a2e95d
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
