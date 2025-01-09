import express from "express";
import { addPatient } from "../controllers/Patient.controller.js";

const router = express.Router();

router.post('/add-patient', addPatient)

export default router;