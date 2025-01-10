import Patient from '../models/Patient.model.js';
import DietChart from '../models/DietChart.model.js';
import MealPreparation from '../models/MealPreperation.model.js';

export const addPatient = async (req, res, next) => {
  try {
    const {
      name,
      diseases,
      allergies,
      room_number,
      bed_number,
      floor_number,
      age,
      gender,
      contact_info,
      emergency_contact,
      diet_chart_data,
      staff_id
    } = req.body;

    // Validate staff_id
    if (!staff_id) {
      return res.status(400).json({ message: 'Staff ID is required for meal preparation.' });
    }

    // 1. Create a new patient
    const newPatient = new Patient({
      name,
      diseases,
      allergies,
      room_number,
      bed_number,
      floor_number,
      age,
      gender,
      contact_info,
      emergency_contact
    });

    const savedPatient = await newPatient.save();

    // 2. Create a new diet chart (status defaults to 'Pending' by schema definition)
    const dietChart = new DietChart({
      patient_id: savedPatient._id,
      morning_meal: diet_chart_data.morning_meal,
      evening_meal: diet_chart_data.evening_meal,
      night_meal: diet_chart_data.night_meal,
      general_instructions: diet_chart_data.general_instructions
    });

    const savedDietChart = await dietChart.save();

    // 3. Create a single meal preparation record for the diet chart
    const mealPreparation = new MealPreparation({
      diet_chart_id: savedDietChart._id,
      staff_id, // Assign the single staff member
    });

    const savedMealPreparation = await mealPreparation.save();

    res.status(201).json({
      message: 'Patient added successfully',
      patient: savedPatient,
      diet_chart: savedDietChart,
      meal_preparation: savedMealPreparation
    });
  } catch (error) {
    next(error);
  }
};
