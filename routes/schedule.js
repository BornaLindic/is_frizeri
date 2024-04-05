import express from "express"
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyAdmin, (req, res, next) => {
    res.render("../views/schedule.pug")
});

export default router
