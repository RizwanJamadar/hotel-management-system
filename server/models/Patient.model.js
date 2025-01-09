import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    diseases: { type: String },
    allergies: { type: String },
    room_number: { type: String, required: true },
    bed_number: { type: String, required: true },
    floor_number: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contact_info: { type: String },
    emergency_contact: { type: String },
    diet_chart: { type: mongoose.Schema.Types.ObjectId, ref: 'DietChart' }, 
}, { timestamps: true });

export default mongoose.model('Patient', patientSchema);
