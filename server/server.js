import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/user.route.js"
import patientRoute from "./routes/Patient.route.js"
import pantryRoute from "./routes/mealPreperation.route.js"
import deliveryRoute from "./routes/mealDelivery.route.js"

const app = express();
dotenv.config();
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/patient", patientRoute);
app.use("/api/meal", pantryRoute);
app.use("/api/delivery", deliveryRoute);

// connection to database
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

// middleware logic to handle error and maintain ux
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// start point of server - port 
app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});