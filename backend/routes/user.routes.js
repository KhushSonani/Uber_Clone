import { Router } from "express";
import { body } from "express-validator";
import { signUpUser , loginUser , getUserProfile} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const router = Router();

router.post(
    "/signup",
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("fullname").trim().notEmpty().withMessage("Full name is required"),
        body("password").isLength({ min: 6 }).withMessage("Password is too short"),
    ],
    signUpUser

);
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({min : 6}).withMessage("Password is too short"),
    ],
    loginUser
);

router.get("/profile",authUser,getUserProfile);


export default router;