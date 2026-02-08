import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true,
            trim:true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true,
        },
        fullname:{
            type: String,
            required: true,
            trim: true,
        },
        password:{
            type:String,
            required:[true,"Password is required!"],
            select: false,
        },
        role: {
            type: String,
            enum: ["rider", "driver"],
            default: "rider",
        },
        socketId:{
            type: String,
        },
        refreshToken:{
            type: String,
        }
    },
    {timestamps:true}
)
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.generateAccessToken

export const User = mongoose.model("User",userSchema);