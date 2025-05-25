import dotenv from "dotenv";
import transporter from "./transporter.js";
import { promises as fs } from "fs";

dotenv.config();

// mail configure
export async function forgetPassword(fullName, email, token) {
    try {
        // fetch html content
        const htmlContent = await fs.readFile(
            "./mails/templates/forget-password.html",
            "utf-8"
        );
        const finalHtml = htmlContent
            .replace("{{username}}", fullName)
            .replace(
                "{{resetLink}}",
                `http://localhost:8000/reset_password/${token}`
            );

        // mail options
        const mailOptions = {
            from: { name: "Majestic 💫", address: process.env.APP_GMAIL },
            to: { name: fullName, address: email },
            subject: "Reset Your Password",
            html: finalHtml,
            text: finalHtml,
        };

        // send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("📩 Reset password mail sent ", info.response);
    } catch (err) {
        console.error("❌ Error sending reset password mail:", err);
    }
}
