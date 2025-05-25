import dotenv from "dotenv";
import transporter from "./transporter.js";
import crypto from "crypto";
import { promises as fs } from "fs";

dotenv.config();

// otp generate
export const generateOtp = () => crypto.randomInt(100000, 999999).toString();

// mail configure
export async function verifyOtp(fullName, email, otp) {
    try {
        // fetch html content
        const htmlContent = await fs.readFile(
            "./mails/templates/verifyOtp.html",
            "utf-8"
        );
        const finalHtml = htmlContent
            .replace("{{otp}}", otp)
            .replace("{{username}}", fullName);

        // mail options
        const mailOptions = {
            from: { name: "Majestic 💫", address: process.env.APP_GMAIL },
            to: { name: fullName, address: email },
            subject: "OTP Verification",
            html: finalHtml,
            text: finalHtml,
        };

        // send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("📩Mail sent ", info.response);
    } catch (err) {
        console.error("❌ Error sending mail:", err);
    }
}
