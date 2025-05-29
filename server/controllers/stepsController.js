<<<<<<< HEAD
<<<<<<< HEAD
import Step from '../models/Step.js';
import mongoose from 'mongoose';
=======
import Step from "../models/stepsModel.js";
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6

export const addStepData = async (req,res) =>{
  const {id, lastModifiedTime, count, startTime, endTime} = req.body;
  const userId = req.body.userId;

  if(!id || !lastModifiedTime || !count || !startTime || !endTime){
    return res.status(400).json({success: false, message: 'Missing required details'});
  }

<<<<<<< HEAD
export default stepController;
=======
import Step from "../models/stepsModel.js";

export const addStepData = async (req,res) =>{
  const {id, lastModifiedTime, count, startTime, endTime} = req.body;
  const userId = req.body.userId;

  if(!id || !lastModifiedTime || !count || !startTime || !endTime){
    return res.status(400).json({success: false, message: 'Missing required details'});
  }

=======
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
  try {
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

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
<<<<<<< HEAD
};
>>>>>>> ca24ff9c3e81bf121923869272d60b633f134d5a
=======
};
>>>>>>> 728401fd8390a3517db2bb10ac43577ba1c288a6
