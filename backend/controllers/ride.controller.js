import { validationResult } from "express-validator";
import { Ride } from "../models/ride.model.js";

export const createRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { pickup, drop, fare } = req.body;

    const ride = await Ride.create({
      rider: req.user._id,
      pickup,
      drop,
      fare,
    });
    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      ride,
    });
  } catch (err) {
    console.error("Can't make Ride! ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPendingRides = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    if (req.user.role !== "driver") {
      return res.status(403).json({
        success: false,
        message: "Only Captains can View pending rides",
      });
    }

    const rides = await Ride.find({
      status: "pending",
      captain: null,
    }).populate("rider", "username fullname");

    return res.status(200).json({
      success: true,
      rides,
    });
  } catch (err) {
    console.error("Get Pending Rides Error!", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! ",
    });
  }
};

export const acceptride = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    if (req.user.role !== "driver") {
      return res.status(403).json({
        success: false,
        message: "Only captains can accept rides",
      });
    }

    const rideId = req.params.id;
    // we can do it by findById,but it causes race condition if two captain click accepted same time
    // so this function finds document,update it and returns it
    // this is atomically -> cannot be interrupted in between   
    const ride = await Ride.findOneAndUpdate(
      {_id : rideId, status:"pending",}, // filter object
      {
        status: "accepted", // updates object
        captain: req.user._id,
      },
      {new :true} // by default this fun returns old docs, so this returns updated docs
    );

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found or already accepted",
      });
    }
    // if (ride.status !== "pending") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Ride is already accepted or completed !",
    //   });
    // }
    // ride.status = "accepted";
    // ride.captain = req.user._id;
    // await ride.save();
    return res.status(200).json({
      success: true,
      message: "Ride Accepted Successfully",
      ride,
    });
  } catch (err) {
    console.error("Accepted Ride Error !", err);
    return res.status(500).json({
      success: false,
      message: "Interval Server Error",
    });
  }
};
