import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("/views/schedule.html", {root: "."})
});

export default router
