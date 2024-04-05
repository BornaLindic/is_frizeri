import express from "express"
import { getFreeSpotsForDate, makeReservation } from "../controllers/reservations.js";
import { verifyToken } from "../utils/verify.js";

const router = express.Router();

router.get("/", verifyToken, getFreeSpotsForDate);
router.post("/", verifyToken, makeReservation);

export default router
