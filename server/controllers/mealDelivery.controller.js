import DietChart from "../models/DietChart.model.js"
import MealDeliveryModel from "../models/MealDelivery.model.js";

export const assignTask = async (req, res, next) => {
    try {
        const { id } = req.params; // DietChart ID
        const { delivery_personnel_id, meal_type } = req.body;
        if (!delivery_personnel_id) {
            return res.status(400).json({ message: 'Delivery personnel ID is required.' });
        }

        if (!meal_type || !['morning_meal', 'evening_meal', 'night_meal'].includes(meal_type)) {
            return res.status(400).json({ message: 'Invalid meal type provided.' });
        }

        // Fetch the DietChart by ID
        const dietChart = await DietChart.findById(id);
        if (!dietChart) {
            return res.status(404).json({ message: 'DietChart not found!' });
        }

        // Check the specified meal type's status
        const mealStatus = dietChart[meal_type]?.status;
        if (!mealStatus) {
            return res.status(400).json({ message: `Status for ${meal_type} is missing.` });
        }

        if (mealStatus !== 'Completed') {
            return res
                .status(400)
                .json({ message: `The ${meal_type} is not completed. Delivery cannot be assigned.` });
        }

        // Create a new MealDelivery record
        const newDelivery = new MealDeliveryModel({
            diet_chart_id: dietChart._id,
            meal_type,
            delivery_personnel_id,
            delivery_status: 'Pending',
            delivery_notes: `Assigned for ${meal_type}`,
        });

        const savedDelivery = await newDelivery.save();

        res.status(201).json({
            message: 'Delivery assigned successfully',
            delivery: savedDelivery,
        });
    } catch (error) {
        next(error);
    }
}


export const updateDeliveryStatus = async (req, res, next) => {
    try {
        if (req.user.Role != "DeliveryPersonnel") {
            return res.status(403).json({ message: "You are not authorized!!" });
        }

        const delivery_personnel_id = req.user.id;
        const { taskId } = req.params; // Extract task ID and new status from the request body

        // Validate input
        if (!taskId) {
            return res.status(400).json({ message: "Task ID and status are required." });
        }

        // Find the task and verify it belongs to the delivery personnel
        const task = await MealDeliveryModel.findOne({
            _id: taskId,
            delivery_personnel_id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized access." });
        }

        // Update the status of the task
        task.delivery_status = "Delivered";
        await task.save();

        res.status(200).json({ message: "Task status updated successfully.", task });


    } catch (error) {
        next(error);
    }
}

export const getDeliveries = async (req, res, next) => {
    try {
        if (req.user.Role != "DeliveryPersonnel") return res.status(403).json({ message: "You are not authorized!!" })
        const delivery_personnel_id = req.user.id;
        const tasks = await MealDeliveryModel.find({ delivery_personnel_id });
        res.status(200).json({ tasks });
    } catch (error) {
        next(error);
    }
}