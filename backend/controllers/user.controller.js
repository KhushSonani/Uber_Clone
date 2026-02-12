import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import { User } from "../models/user.model.js"
import { generateAccessToken , generateRefreshToken} from "../utils/token.js";


const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"    
};

export const signUpUser = async(req,res)=>{

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

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); 
    const safeUser = {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
    };


    res.status(201)
    .cookie("refreshToken", refreshToken,options)
    // .cookie("accessToken", accessToken,options)
    .json({
        accessToken,
        user: safeUser,
    });

};

export const loginUser = async(req,res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(401).json({errors: error.array() });
    }

    const {email,password} = req.body;
    const user = await User.findOne({ email }).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.isPasswordCorrect(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); 
    const safeUser = {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
    };

    // console.log(accessToken);
    // console.log(refreshToken);
    
    res.status(200)
    .cookie("refreshToken", refreshToken,options)
    // .cookie("accessToken", accessToken,options)
    .json({
        accessToken,
        user: safeUser,
    });

};

export const getUserProfile = async(req,res) =>{
    res.status(200).json({user: req.user});
}

export const logoutUser = async(req,res) => {
    try {
        await User.findByIdAndUpdate(req.user._id,{
            refreshToken: null,
        });

        res.clearCookie("refreshToken",options);
        res.status(200).json({message:"Logget out Successfully !"});
    } catch (err) {
        res.status(500).json({message:"Log out failed !"});
        
    }
}