import express from "express";
import { login, register, logout } from "../controllers/User.controller.js";
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router();

router.post("/register",verifyToken, register);
router.post("/login", login);

router.post("/logout", logout);
export default router;