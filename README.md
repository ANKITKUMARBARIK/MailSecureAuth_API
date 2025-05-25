# 📧 MailSecureAuth 🔐

**MailSecureAuth** is a secure user authentication backend system built with Node.js, Express, and MongoDB. It features OTP-based email verification during signup, welcome email delivery, secure login/logout, and password reset functionality through email.

---

## 🚀 Features

- ✅ **User Signup with OTP Verification**
- 📩 **Welcome Email after successful signup**
- 🔐 **Secure Login & Logout**
- 🔁 **Forgot Password flow with email link**
- 🔄 **Reset Password using secure token link**
- 🧠 **JWT Authentication**
- 🔒 **Password hashing with Bcrypt**
- 📬 **Emails sent via Nodemailer**

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for secure authentication
- **Nodemailer** for sending emails
- **Bcrypt** for password hashing
- **Dotenv** for environment configuration

---

## 📁 Folder Structure

```
MailSecureAuth/
├── controllers/        # Logic for each route
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── services/           # Email and OTP services
├── middlewares/        # Authentication middlewares
├── utils/              # Helper functions (e.g., token generation)
├── config/             # Configuration files (e.g., DB connection)
├── .env                # Environment variables
├── server.js / app.js  # Main entry point
├── package.json
└── README.md
```

---

## 🔧 Installation

```bash
git clone https://github.com/ANKITKUMARBARIK/MailSecureAuth.git
cd MailSecureAuth
npm install
```
> Create a `.env` file with your environment variables (PORT, DB_URL, JWT_SECRET, EMAIL_USER, etc.)

---

## 📬 Environment Variables

```env
PORT=8000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
FRONTEND_URL=http://localhost:8000
```

---

## 📪 API Endpoints Overview

| Method | Endpoint              | Description                 |
|--------|------------------------|-----------------------------|
| POST   | /api/auth/signup       | Signup with OTP email verify |
| POST   | /api/auth/verify-otp   | Verify OTP during signup     |
| POST   | /api/auth/login        | Login user                   |
| GET    | /api/auth/logout       | Logout user                  |
| POST   | /api/auth/forgot       | Send password reset email    |
| POST   | /api/auth/reset/:token | Reset password with new one  |

---

## 🤝 Contribution

Feel free to open issues or submit pull requests to improve the project!

---

## 📄 License

GNU License

---

> Created with ❤️ by [ankit](https://github.com/ANKITKUMARBARIK)
