import express from "express";
import { checkForAuthorization } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";

const router = express.Router();

// admin route
router.put(
    "/make-admin/:id",
    checkForAuthorization("ADMIN"),
    async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findByIdAndUpdate(
                { _id: id },
                { role: "ADMIN" },
                { new: true }
            );
            if (!user) return res.json({ msg: "User not found" });
            return res
                .status(200)
                .json({ message: "User promoted to admin", user: user });
        } catch (error) {
            return res
                .status(500)
                .json({ msg: "Server error", error: error.message });
        }
    }
);

export default router;
