import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js"
import { generateAccessToken } from "../utils/token.js";

export const signupUser = async(req,res)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array() });
    }

    const { username,fullname,email,password } = req.body;

    const user = await createUser({
        username,
        fullname,
        email,
        password,
    });

    const token = generateAccessToken(user);
    
    res.status(201).json({
        success: true,
        token,
        user:{
            id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
        },
    });
};