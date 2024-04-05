import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
    var loggedIn = false
    if (req.cookies.access_token) {
        loggedIn = true
    }

    res.render("../views/home.pug", {loggedIn: loggedIn})
});

export default router
