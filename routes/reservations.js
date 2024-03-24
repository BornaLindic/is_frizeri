import express from "express"
import { getFreeSpotsForDate, makeReservation } from "../controllers/reservation.js";

const router = express.Router();

router.get("/", getFreeSpotsForDate);
router.post("/", makeReservation);

export default router
