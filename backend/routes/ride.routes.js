import { Router } from "express";
import { body, param } from "express-validator";
import { createRide , getPendingRides, acceptride } from  "../controllers/ride.controller.js"
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

router.get(
    "/pending",
    authUser,
    getPendingRides
);

router.patch(
    "/:id/accept",
    authUser,
    [
        param("id").notEmpty().withMessage("Ride Id is required ")
    ],
    acceptride,
);

export default router;
