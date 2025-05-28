import Step from "../models/stepsModel";

export const addStepData = async (req,res) =>{
  const {id, lastModifiedTime, count, startTime, endTime} = req.body;
  const userId = req.body.userId;

  if(!id || !lastModifiedTime || !count || !startTime || !endTime){
    return res.status(400).json({success: false, message: 'Missing required details'});
  }

  try {
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

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};