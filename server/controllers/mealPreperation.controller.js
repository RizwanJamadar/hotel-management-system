import { createError } from "../utils/error.js"
import MealPreparation from "../models/MealPreperation.model.js"

export const fetchTasks = async (req, res, next) => {
    try {
        console.log(req.user);
        const staff_id = req.user.id;
        console.log(staff_id);// Extracted from JWT token

        const tasks = await MealPreparation.find({ staff_id })
            .populate('diet_chart_id') // Populate diet chart details
            .exec();

        res.status(200).json({ tasks });
    } catch (error) {
        // next(createError("Unable to fetch your taks!!"))
        next(error)
    }
}

// update individual meal status
export const updateMeal = async (req, res, next) => {
    try {
        // MealPreparation ID
        const { id } = req.params;
        // Destructure individual meal statuses from the request body
        const { morning, evening, night } = req.body;

        // Validate individual meal statuses
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        if (
            (morning && !validStatuses.includes(morning)) ||
            (evening && !validStatuses.includes(evening)) ||
            (night && !validStatuses.includes(night))
        ) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const task = await MealPreparation.findById(id).populate('diet_chart_id');
        if (!task) return res.status(404).json({ message: 'Task not found!' });

        const dietChart = task.diet_chart_id;
        if (!dietChart) return res.status(404).json({ message: 'Diet chart not found!' });

        // Update individual meal statuses in the DietChart
        if (morning) dietChart.morning_meal.status = morning;
        if (evening) dietChart.evening_meal.status = evening;
        if (night) dietChart.night_meal.status = night;

        // Save the updated DietChart
        await dietChart.save();

        res.status(200).json({
            message: 'Meal statuses updated successfully',
            diet_chart: dietChart,
        });
    } catch (error) {
        next(error)
    }
}