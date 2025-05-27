import express from 'express';
import { addBloodPressureData, getBloodPressureData } from '../controllers/bloodPressureController.js';
import userAuth from '../middleware/userAuth.js';

const bpRouter = express.Router();

bpRouter.post('/add', userAuth, addBloodPressureData);
bpRouter.get('/dashboard', userAuth, getBloodPressureData);

export default bpRouter;
