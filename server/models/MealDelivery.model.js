import mongoose from "mongoose"

const mealDeliverySchema = new mongoose.Schema({
    diet_chart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart', required: true }, // Reference to DietChart
    meal_type: { type: String, enum: ['morning_meal', 'evening_meal', 'night_meal'], required: true }, // Specifies the meal
    delivery_status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    delivery_time: { type: Date },
    delivery_notes: { type: String },
    delivery_personnel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to User schema (role: DeliveryPersonnel)
}, { timestamps: true });

export default mongoose.model('MealDelivery', mealDeliverySchema);
