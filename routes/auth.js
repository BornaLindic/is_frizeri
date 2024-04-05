import express from "express"
import { login, loginView, logout, register, registerView } from "../controllers/auth.js"

const router = express.Router()

router.get("/register", registerView)
router.get("/login", loginView)

router.post("/register", register)
router.post("/login", login)

router.get("/logout", logout)

export default router