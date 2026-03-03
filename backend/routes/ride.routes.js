import { Router } from "express";
import { body, param } from "express-validator";
import { createRide , getPendingRides, acceptride, completeRide, cancelRide } from  "../controllers/ride.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"
import { allowCaptainOnly, allowRiderOnly } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
    "/",
    authUser,
    [
        body("pickup").notEmpty().withMessage("Pickup location is required "),
        body("drop").notEmpty().withMessage("drop location is required "),
        body("fare").isNumeric().withMessage("Fare must be a number "),
    ],
    allowRiderOnly,
    createRide
);

router.get(
    "/pending",
    authUser,
    allowCaptainOnly,
    getPendingRides
);

router.patch(
    "/:id/accept",
    authUser,
    [
        param("id").notEmpty().withMessage("Ride Id is required ")
    ],
    allowCaptainOnly,
    acceptride,
);

router.patch(
    "/:id/complete",
    authUser,
    [
        param("id").notEmpty().withMessage("Ride Id is required ")
    ],
    allowCaptainOnly,
    completeRide,
);

router.patch(
    "/:id/cancel",
    authUser,
    [
        param("id").notEmpty().withMessage("Ride Id is required ")
    ],
    cancelRide,
);



export default router;
