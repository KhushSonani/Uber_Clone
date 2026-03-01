import { Captain } from "../models/captain.model.js";
import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const captainsignUp = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { username, fullname, email, password, vehicle } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const user = await User.create({
      username,
      email,
      fullname,
      password,
      role: "driver",
    });
    if (
      !vehicle?.color ||
      !vehicle?.plate ||
      !vehicle?.capacity ||
      !vehicle?.vehicleType
    ) {
      return res.status(400).json({
        success: false,
        message: "All vehicle fields are required",
      });
    }
    const captain = await Captain.create({
      user: user._id,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: Number(vehicle.capacity),
        vehicleType: vehicle.vehicleType,
      },
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const safeUser = {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
    };

    return res.status(201).cookie("refreshToken", refreshToken, options).json({
      success: true,
      message: "Captain registered successfully !",
      accessToken,
      user: safeUser,
      captain,
    });
  } catch (err) {
    console.error("Captain Signup Error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Vehicle plate already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const captainlogin = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         errors: errors.array(),
//       });
//     }

//     const { email, password } = req.body;
//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password ",
//       });
//     }

//     if (user.role !== "driver") {
//       return res.status(403).json({
//         success: false,
//         message: "Access Denied. Not a captain account.",
//       });
//     }

//     const isPasswordValid = await user.isPasswordCorrect(password);
//     if (!isPasswordValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     const safeUser = {
//       id: user._id,
//       username: user.username,
//       fullname: user.fullname,
//       email: user.email,
//       role: user.role,
//     };

//     const captain = await Captain.findOne({ user: user._id });
//     return res.status(200).cookie("refreshToken", refreshToken, options).json({
//       success: true,
//       message: "Captain logged in successfully.",
//       accessToken,
//       user: safeUser,
//       captain,
//     });
//   } catch (err) {
//     console.error("Captain Login Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
