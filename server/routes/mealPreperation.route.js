import express from "express"
import { fetchTasks, updateMeal } from "../controllers/mealPreperation.controller.js";
import {authenticateToken} from "../utils/verifyToken.js"

const router = express.Router();

router.get('/my-tasks',authenticateToken,fetchTasks)
router.patch('/update-task-status/:id',authenticateToken, updateMeal)

export default router;