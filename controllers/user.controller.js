import User from "../models/user.model.js";
import { generateTokenForUser } from "../services/auth.service.js";
import { generateOtp, verifyOtp } from "../mails/verifyOtp.mail.js";
import { welcomeMail } from "../mails/welcome.mail.js";
import crypto from "crypto";
import { forgetPassword } from "../mails/forget-password.mail.js";

export async function handleSignup(req, res) {
    const { fullName, email, password, timezone } = req.body;
    if (!fullName || !email || !password || !timezone)
        return res.status(400).json({ msg: "all fields req..." });
    const user = await User.findOne({ email });
    if (user)
        return res.render("signup", { signupError: "User Already Exists" });
    // otp
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const result = new User({
        fullName,
        email,
        password,
        timezone,
        otp,
        otpExpiry,
    });
    await result.save(); // triggers pre-save password hashing

    await verifyOtp(result.fullName, result.email, result.otp);

    return res.render("verifyOtp", { email: result.email });
}

export async function handleVerifyOtp(req, res) {
    const { verifyOtp } = req.body;
    if (!verifyOtp) return res.status(400).json({ msg: "field req..." });
    const user = await User.findOne({ otp: verifyOtp });
    if (!user)
        return res.render("verifyOtp", {
            verifyOtpError: "Invalid or Expired Code",
        });
    if (user.otpExpiry < new Date())
        return res.render("verifyOtp", {
            verifyOtpError: "Invalid or Expired Code",
        });
    // update & save user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // send welcome mail (after verified)
    await welcomeMail(user.fullName, user.email);

    return res.redirect("/signin");
}

export async function handleSignin(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ msg: "all fields req..." });
    const user = await User.findOne({ email });
    if (!user)
        return res.render("signin", {
            signinError: "Invalid Email or Password",
        });
    const isValid = await user.comparePassword(password);
    if (!isValid)
        return res.render("signin", {
            signinError: "Invalid Email or Password",
        });
    // verify otp (if user is not verified)
    if (!user.isVerified) {
        await verifyOtp(user.fullName, user.email, user.otp);
        return res.render("verifyOtp", { email: user.email });
    }
    const token = generateTokenForUser(user);
    res.cookie("token", token);

    return res.redirect("/");
}

export async function handleLogout(req, res) {
    res.clearCookie("token");

    return res.redirect("/");
}

export async function handleForgetPassword(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "fields req..." });
    const user = await User.findOne({ email });
    if (!user)
        return res.render("forget-password", {
            forgetPasswordError: "Email not found",
        });
    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1 hour from now
    // update & save user
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(expiry);
    await user.save();

    // Send email with reset link (token included)
    await forgetPassword(user.fullName, user.email, user.resetPasswordToken);

    return res.render("forget-password", {
        resetPassword: "Password reset email sent",
    });
}

export async function handleResetPassword(req, res) {
    const token = req.params.token;
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ msg: "field req..." });
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user)
        return res.render("reset_password", {
            resetError: "Invalid or expired token",
        });
    if (user.resetPasswordExpires < new Date())
        return res.render("reset_password", {
            resetError: "Invalid or expired token",
        });
    // update & save user
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.render("reset_password", {
        resetSuccess:
            "Password reset successfully. You can now log in with your new password.",
    });
}
