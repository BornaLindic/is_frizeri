import express from "express"
import { getAdminCalendar, getUserCalendar } from "../controllers/calendar.js"
import { verifyAdmin } from "../utils/verify.js";


const router = express.Router();

// get calendar data for user view
router.get("/", getUserCalendar);

// get calendar data for admin view
router.get("/admin", verifyAdmin, getAdminCalendar);

export default router
