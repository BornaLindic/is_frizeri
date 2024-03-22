import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const registerView = async (req, res, next) => {
    res.render("../views/register.pug")
}

export const loginView = async (req, res, next) => {
    res.render("../views/login.pug")
}

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hash
        );

        await newUser.persist();
        res.status(200).send("User has been created.");
        
    } catch(err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.fetchByEmail(req.body.email);
        if(!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY)

        const {password, role, ...otherDetails} = user;
        res.cookie("access_token", token, {httpOnly:true})
           .status(200)
           .json({...otherDetails});

    } catch(err) {
        next(err);
    }
};