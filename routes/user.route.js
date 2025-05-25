import express from "express";
import {
    handleSignup,
    handleVerifyOtp,
    handleSignin,
    handleLogout,
    handleForgetPassword,
    handleResetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/verifyOtp", handleVerifyOtp);
router.post("/signin", handleSignin);
router.get("/logout", handleLogout);
router.post("/forget-password", handleForgetPassword);
router.post("/reset_password/:token", handleResetPassword);

export default router;
