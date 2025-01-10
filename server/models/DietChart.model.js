import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Reference to Patient
    morning_meal: {
        meal_name: { type: String },
        ingredients: [{ type: String }],
        instructions: { type: String },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
    },
    evening_meal: {
        meal_name: { type: String },
        ingredients: [{ type: String }],
        instructions: { type: String },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
    },
    night_meal: {
        meal_name: { type: String },
        ingredients: [{ type: String }],
        instructions: { type: String },
        status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
    },
    general_instructions: { type: String }, // Additional general instructions
}, { timestamps: true });

export default mongoose.model('DietChart', dietChartSchema);
