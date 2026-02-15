import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
export const authUser = async(req,res,next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer "))
        {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid token - User not found" });
        }
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({message: "Unauthorized"});
    }
};