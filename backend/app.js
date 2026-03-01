import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import rideRoutes from "./routes/ride.routes.js"

import cookieParser from "cookie-parser";

const app = express();
// configures only after creating app
// middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
// for files
app.use(express.json());
// for url
app.use(express.urlencoded({ extended:true }));
// for perform operations on user cookies
app.use(cookieParser());    

app.get('/',(req,res)=>{
    res.send('It is Working');
});

//routes
app.use("/api/users",userRoutes);
app.use("/api/captains",captainRoutes);
app.use("/api/rides", rideRoutes);

export default app;