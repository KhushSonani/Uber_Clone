import { Router } from "express";
import { body } from "express-validator";
import { signupUser } from "../controllers/user.controller.js";


const router = Router();

router.post(
    "/signup",
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("fullname").trim().notEmpty().withMessage("Full name is required"),
        body("password").isLength({ min: 6 }).withMessage("Password too short"),
    ],
    signupUser

);


export default router;