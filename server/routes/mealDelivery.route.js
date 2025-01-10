import express from "express"
import { assignTask, getDeliveries, updateDeliveryStatus } from "../controllers/mealDelivery.controller.js";
import { authenticateToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get('/my-tasks',authenticateToken, getDeliveries);
router.patch('/update/:taskId',authenticateToken,updateDeliveryStatus)
router.post('/assign-delivery/:id',assignTask);

export default router;