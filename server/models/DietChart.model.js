import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true }, // Reference to Patient
    morning_meal: {
        type: {
            meal_name: { type: String },
            ingredients: [{ type: String }],
            instructions: { type: String }
        }
    },
    evening_meal: {
        type: {
            meal_name: { type: String },
            ingredients: [{ type: String }],
            instructions: { type: String }
        }
    },
    night_meal: {
        type: {
            meal_name: { type: String },
            ingredients: [{ type: String }],
            instructions: { type: String }
        }
    },
    general_instructions: { type: String }, // Additional general instructions
}, { timestamps: true });

export default mongoose.model('DietChart', dietChartSchema);
