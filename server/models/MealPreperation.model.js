import mongoose from "mongoose";

const mealPreparationSchema = new mongoose.Schema({
    diet_chart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true }, // Reference to DietChart
    preparation_status: {
        morning: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
        evening: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
        night: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    }, // Status for each meal
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to PantryStaff
}, { timestamps: true });

export default mongoose.model('MealPreparation', mealPreparationSchema);
