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
