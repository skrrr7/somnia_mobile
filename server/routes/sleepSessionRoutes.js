import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addSleepSession} from '../controllers/sleepSessionController.js';

const sleepSessionRouter = express.Router();

sleepSessionRouter.post('/addSleepSession', userAuth,addSleepSession);

export default sleepSessionRouter;