import dotenv from "dotenv";
import express from "express";
import mongoConnect from "./connection.js";
import path from "path";
import cookieParser from "cookie-parser";
import staticRouter from "./routes/staticRouter.route.js";
import userRouter from "./routes/user.route.js";
import { checkForAuthentication } from "./middlewares/auth.middleware.js";
import createDefaultAdmin from "./services/seedAdmin.service.js";
import adminRouter from "./routes/admin.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// connection
mongoConnect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected...");
        // Seed admin after DB connect
        createDefaultAdmin();
    })
    .catch((err) => console.log("Mongo Error ", err));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

// ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));
