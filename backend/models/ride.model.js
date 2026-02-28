import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    rider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    pickup:{
        type: String,
        required: true,
    },
    drop:{
        type: String,
        required: true,
    },
    fare:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum : ["pending","accepted","ongoing","completed","cancelled"],
        default:"pending",
    }
},{timestamps:true});

export const Ride = mongoose.model("Ride",rideSchema);