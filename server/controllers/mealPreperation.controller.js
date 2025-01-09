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
export const updateMeal = async (req,res,next) => {
    try {
        // MealPreparation ID
        const { id } = req.params; 
        // Destructure individual meal statuses
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

        // Fetch the task to update
        const task = await MealPreparation.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found!' });

        // Update individual meal statuses
        if (morning) task.preparation_status.morning = morning;
        if (evening) task.preparation_status.evening = evening;
        if (night) task.preparation_status.night = night;

        // Save the updated task
        await task.save();

        res.status(200).json({
            message: 'Task status updated successfully',
            task,
        });
    } catch (error) {
        next(error)
    }
}