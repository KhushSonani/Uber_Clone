import { User } from "../models/user.model.js";

export const createUser = async({ username,fullname,email,password })=>{
    if(!fullname || !username || !email || !password){
        throw new Error("All fields are required");
    }
    const user = await User.create({
        username,
        fullname,
        email,
        password,
    });
    
    return user;
};