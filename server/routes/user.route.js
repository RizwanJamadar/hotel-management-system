import express from "express";
// this error is resolved ..
import { login, register, logout } from "../controllers/user.controller.js";
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", logout);
export default router;