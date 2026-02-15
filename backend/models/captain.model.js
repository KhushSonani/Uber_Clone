import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type: String,
        enum: ["available", "busy"],
        default: "busy",
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minLength: [3,"Color must be at least 3 characters long"],
        },
        plate:{
            type: String,  
            required: true,
            unique: true,
            trim: true,
            match: [/^[A-Z0-9-]+$/, "Plate must contain only uppercase letters, numbers, and dashes"],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        vehicleType:{
            type: String,
            enum: ["car", "bike", "scooter","auto"],
            required: true,
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        }
    },
},{timestamps:true});


export const Captain = mongoose.model("Captain",captainSchema);
