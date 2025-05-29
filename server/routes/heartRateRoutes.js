import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addHeartRate } from '../controllers/heartRateController.js';

const heartRateRouter = express.Router();
heartRateRouter.post('/addHeartRate', userAuth, addHeartRate);

export default heartRateRouter;



