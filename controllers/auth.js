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

        const token = jwt.sign({id:newUser.id, role: newUser.role}, process.env.JWT_SECRET_KEY)
        
        const {password, role, ...otherDetails} = newUser;
        res.cookie("access_token", token, {httpOnly:true})
           .redirect("/")
        
    } catch(err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.fetchByEmail(req.body.email);
        if(!user) {
            res.render("../views/login.pug", {failedLogin: true})
            return
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) {
            res.render("../views/login.pug", {failedLogin: true})
            return
        }

        const token = jwt.sign({id:user.id, role: user.role}, process.env.JWT_SECRET_KEY)

        const {password, role, ...otherDetails} = user;
        res.cookie("access_token", token, {httpOnly:true})
           .redirect("/")

    } catch(err) {
        next(err);
    }
};


export const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token")
           .redirect("/")
    } catch(err) {
        next(err);
    }
};