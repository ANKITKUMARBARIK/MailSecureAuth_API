import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

async function createDefaultAdmin() {
    try {
        const existingAdmin = await User.findOne({ role: "ADMIN" });
        if (!existingAdmin) {
            const user = new User({
                fullName: "Admin",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                timezone: "Asia/Kolkata",
                role: "ADMIN",
                isVerified: true,
            });
            await user.save();
            console.log("✅ Default admin created successfully");
        } else {
            console.log("ℹ️ Admin user already exists");
        }
    } catch (error) {
        console.error("❌ Error creating default admin:", error);
    }
}

export default createDefaultAdmin;
