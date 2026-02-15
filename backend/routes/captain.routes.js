import { Router } from "express";
import { body } from "express-validator";
import { captainsignUp, captainlogin } from "../controllers/captain.controller.js";

const router = Router();

router.post(
    "/signup",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("fullname").notEmpty().withMessage("Full name is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
        body("vehicle.color")
            .notEmpty()
            .withMessage("Vehicle color is required"),
        body("vehicle.plate")
            .notEmpty()
            .withMessage("Vehicle plate is required"),
        body("vehicle.capacity")
            .isInt({ min: 1 })
            .withMessage("Vehicle capacity must be at least 1"),
        body("vehicle.vehicleType")
            .isIn(["car", "bike", "scooter", "auto"])
            .withMessage("Invalid vehicle type"),
    ],
    captainsignUp
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    captainlogin
)

export default router;