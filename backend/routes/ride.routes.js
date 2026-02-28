import { Router } from "express";
import { body } from "express-validator";
import { createRide } from  "../controllers/ride.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"

const router = Router();

router.post(
    "/",
    authUser,
    [
        body("pickup").notEmpty().withMessage("Pickup location is required "),
        body("drop").notEmpty().withMessage("drop location is required "),
        body("fare").isNumeric().withMessage("Fare must be a number "),
    ],
    createRide
);

export default router;
