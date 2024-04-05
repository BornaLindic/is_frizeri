import jwt from "jsonwebtoken"
import { createError } from "./error.js"


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        res.redirect("/auth/login")
        return
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(createError(403, "Token is not valid"));

        req.user = user;
        next()
    });
};


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.role) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};