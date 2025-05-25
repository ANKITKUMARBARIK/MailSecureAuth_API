import { validateToken } from "../services/auth.service.js";

export function checkForAuthentication(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return next();
    const userPayload = validateToken(token);
    if (!userPayload) return res.redirect("/signin");
    req.user = userPayload;

    return next();
}

export function checkForAuthorization(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) return res.redirect("/signin");
        if (!allowedRoles.includes(req.user.role))
            return res
                .status(403)
                .json({ message: "Access denied: Not authorized" });
        next();
    };
}
