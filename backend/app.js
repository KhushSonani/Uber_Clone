import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());    

app.get('/',(req,res)=>{
    res.send('It is Working');
});

//routes
app.use("/api/users",userRoutes);
app.use("/api/captains",captainRoutes);
export default app;