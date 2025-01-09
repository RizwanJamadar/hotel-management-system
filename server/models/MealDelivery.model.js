import mongoose from "mongoose";

const mealDeliverySchema = new mongoose.Schema({
    meal_preparation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MealPreparation', required: true }, // Reference to MealPreparation
    delivery_status: { type: String, enum: ['Pending', 'Delivered'], default: 'Pending' },
    delivery_time: { type: Date },
    delivery_notes: { type: String },
    delivery_personnel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to User schema (role: DeliveryPersonnel)
}, { timestamps: true });

module.exports = mongoose.model('MealDelivery', mealDeliverySchema);
