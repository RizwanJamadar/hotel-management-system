import { createError } from "../utils/error.js"
import MealPreparation from "../models/MealPreperation.model.js"

export const fetchTasks = async (req, res, next) => {
    try {
        console.log(req.user);
        const staff_id = req.user.id;
        console.log(staff_id);// Extracted from JWT token

        const tasks = await MealPreparation.find({ staff_id })
            .populate({
                path: 'diet_chart_id', // Populate diet chart details
                populate: {
                    path: 'patient_id', // Populate patient details within diet chart
                },
            })
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
        // Destructure meal type and status from the request body
        const { mealType, status } = req.body;

        // Validate the meal type and status
        const validStatuses = ['Pending', 'In Progress', 'Completed'];
        const validMealTypes = ['morning', 'evening', 'night'];

        if (!validMealTypes.includes(mealType)) {
            return res.status(400).json({ message: 'Invalid meal type' });
        }

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the MealPreparation task
        const task = await MealPreparation.findById(id).populate('diet_chart_id');
        if (!task) return res.status(404).json({ message: 'Task not found!' });

        const dietChart = task.diet_chart_id;
        if (!dietChart) return res.status(404).json({ message: 'Diet chart not found!' });

        // Update the status of the selected meal (morning, evening, or night)
        dietChart[`${mealType}_meal`].status = status;

        // Save the updated DietChart
        await dietChart.save();

        res.status(200).json({
            message: 'Meal status updated successfully',
            diet_chart: dietChart,
        });
    } catch (error) {
        next(error);
    }
};
