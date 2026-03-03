import { validationResult } from "express-validator";
import { Ride } from "../models/ride.model.js";
import { Captain } from "../models/captain.model.js";

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
    const captain = await Captain.findOne({ user: req.user._id });

    if (!captain || captain.status !== "available") {
      return res.status(403).json({
        success: false,
        message: "You are currently Busy",
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

    const captain = await Captain.findOne({ user: req.user._id });
    if (!captain || captain.status !== "available") {
      return res.status(403).json({
        success: false,
        message: "You are currently not available",
      });
    }
    const rideId = req.params.id;
    // we can do it by findById,but it causes race condition if two captain click accepted same time
    // so this function finds document,update it and returns it
    // this is atomically -> cannot be interrupted in between
    const ride = await Ride.findOneAndUpdate(
      { _id: rideId, status: "pending" }, // filter object
      {
        status: "accepted", // updates object
        captain: req.user._id,
      },
      { new: true }, // by default this fun returns old docs, so this returns updated docs
    );

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found or already accepted",
      });
    }

    const updatedCaptain = await Captain.findOneAndUpdate(
      { user: req.user._id },
      { status: "busy" },
      { new: true },
    );
    if (!updatedCaptain) {
      return res.status(500).json({
        success: false,
        message: "Failed to update captain status",
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
      message: "Internal Server Error",
    });
  }
};

export const completeRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const ride = await Ride.findOneAndUpdate(
      {
        // filters to find ride
        _id: req.params.id,
        captain: req.user._id,
        status: "accepted",
      },
      {
        // updates to make in DB
        status: "completed",
      },
      {
        // return new updated object instead old
        new: true,
      },
    );

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found or not allowed to complete",
      });
    }

    const updatedCaptain = await Captain.findOneAndUpdate(
      { user: req.user._id, status: "busy" },
      { status: "available" },
      { new: true },
    );

    if (!updatedCaptain) {
      return res.status(500).json({
        success: false,
        message: "Ride completed but failed to update captain status",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ride completed successfully",
      ride,
    });

    // Other easy method to learn and understand
    // const ride = await Ride.findById(req.params.id);
    // if (!ride) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Ride not exist !",
    //   });
    // }

    // if (ride.status !== "accepted") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Ride is not in accepted state",
    //   });
    // }

    // if(ride.captain.toString() !== req.user._id.toString()){
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not assigned to this ride ",
    //   });
    // }

    // ride.status = "completed"
    // await ride.save();
    // return success msg
  } catch (err) {
    console.error("Complete Ride Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const cancelRide = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    if (req.user.role === "rider") {
      if (ride.rider.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not your ride",
        });
      }

      if (ride.status === "completed") {
        return res.status(400).json({
          success: false,
          message: "Completed ride cannot be cancelled",
        });
      }

      if (ride.captain) {
        const updatedCaptain = await Captain.findOneAndUpdate(
          { user: ride.captain ,status: "busy"},
          { status: "available" },
        );
        if (!updatedCaptain) {
          return res.status(500).json({
            success: false,
            message: "Failed to update captain status",
          });
        }
      }

      ride.status = "cancelled";
      ride.captain = null;
      await ride.save();

      return res.status(200).json({
        success: true,
        message: "Ride cancelled successfully",
        ride,
      });
    }

    if (req.user.role === "driver") {
      
      if (ride.status !== "accepted") {
        return res.status(400).json({
          success: false,
          message: "Only accepted rides can be cancelled",
        });
      }
      
      if (ride.captain?.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Not assigned to this ride",
        });
      }


      ride.status = "pending";
      ride.captain = null;
      await ride.save();

      const updatedCaptain = await Captain.findOneAndUpdate(
        { user: req.user._id ,status: "busy"},
        { status: "available" },
      );

      if (!updatedCaptain) {
        return res.status(500).json({
          success: false,
          message: "Failed to update captain status",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Ride cancelled by captain",
        ride,
      });
    }

    return res.status(403).json({
      success: false,
      message: "Unauthorized role",
    });
  } catch (err) {
    console.error("Cancel Ride Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
