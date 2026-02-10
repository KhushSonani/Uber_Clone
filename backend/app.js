import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());    
//routes
app.use("/api/users",userRoutes);

app.get('/',(req,res)=>{
    res.send('It is Working');
});

export default app;