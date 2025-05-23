import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = [
    'http://localhost:5173',         // Vite (web) frontend
    'https://som-ni-a.vercel.app',  // Deployed frontend
    'http://localhost:8081',         // Expo Go default local web (Expo dev tools)
    'http://localhost:19006',        // Expo web
    'exp://127.0.0.1:19000',         // Expo mobile local dev (iOS/Android)
    'http://192.168.0.X:19006',      // Replace with your LAN IP if using physical device
  ];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

//API Endpoints
app.get('/',(req,res)=> res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, ()=> console.log(`Server started on PORT:${port}`));
