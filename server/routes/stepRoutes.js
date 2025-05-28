import express from 'express';
import { addStepData } from '../controllers/stepsController.js';
import userAuth from '../middleware/userAuth.js';

const stepRouter = express.Router();
stepRouter.post('/addStep', userAuth, addStepData)

export default stepRouter;