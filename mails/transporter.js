import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// connection mail with smtp server(gmail)
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
        user: process.env.APP_GMAIL,
        pass: process.env.APP_PASSWORD,
    },
});

export default transporter;
