import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    if (!req.user) return res.redirect("/signin");
    return res.render("home", { user: req.user });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/signin", (req, res) => {
    return res.render("signin");
});

router.get("/forget-password", (req, res) => {
    return res.render("forget-password");
});

router.get("/reset_password/:token", (req, res) => {
    const token = req.params.token;
    return res.render("reset_password", { token });
});

export default router;
