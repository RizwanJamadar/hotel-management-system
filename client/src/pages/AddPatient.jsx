import React, { useState } from "react";
import axios from "axios";

const AddPatient = () => {
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    contact_info: "",
    emergency_contact: "",
    room_number: "",
    bed_number: "",
    floor_number: "",
    diseases: "",
    allergies: "",
    diet_chart_data: {
      morning_meal: { meal_name: "", ingredients: "", instructions: "" },
      evening_meal: { meal_name: "", ingredients: "", instructions: "" },
      night_meal: { meal_name: "", ingredients: "", instructions: "" },
    },
    general_instructions: "",
    staff_id:""
  });

  const handleInputChange = (e, section, field) => {
    const { name, value } = e.target;

    if (section) {
      setPatientDetails((prevState) => ({
        ...prevState,
        diet_chart_data: {
          ...prevState.diet_chart_data,
          [section]: {
            ...prevState.diet_chart_data[section],
            [field]: value,
          },
        },
      }));
    } else {
      setPatientDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientData = {
      name: patientDetails.name,
      diseases: patientDetails.diseases,
      allergies: patientDetails.allergies,
      room_number: patientDetails.room_number,
      bed_number: patientDetails.bed_number,
      floor_number: patientDetails.floor_number,
      age: patientDetails.age,
      gender: patientDetails.gender,
      contact_info: patientDetails.contact_info,
      emergency_contact: patientDetails.emergency_contact,
      diet_chart_data: {
        morning_meal: {
          meal_name: patientDetails.diet_chart_data?.morning_meal?.meal_name || "",
          ingredients: patientDetails.diet_chart_data?.morning_meal?.ingredients
            ? patientDetails.diet_chart_data.morning_meal.ingredients.split(",")
            : [],
          instructions:
            patientDetails.diet_chart_data?.morning_meal?.instructions || "",
        },
        evening_meal: {
          meal_name: patientDetails.diet_chart_data?.evening_meal?.meal_name || "",
          ingredients: patientDetails.diet_chart_data?.evening_meal?.ingredients
            ? patientDetails.diet_chart_data.evening_meal.ingredients.split(",")
            : [],
          instructions:
            patientDetails.diet_chart_data?.evening_meal?.instructions || "",
        },
        night_meal: {
          meal_name: patientDetails.diet_chart_data?.night_meal?.meal_name || "",
          ingredients: patientDetails.diet_chart_data?.night_meal?.ingredients
            ? patientDetails.diet_chart_data.night_meal.ingredients.split(",")
            : [],
          instructions: patientDetails.diet_chart_data?.night_meal?.instructions || "",
        },
      },
      general_instructions: patientDetails.general_instructions,
      staff_id: "677fa484f1492e5f33b919e3"
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACK_END}/patient/add-patient`, patientData);
      console.log("Patient added:", response.data);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Add New Patient
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap">
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={patientDetails.name}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={patientDetails.age}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter age"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={patientDetails.gender}
                onChange={(e) => handleInputChange(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Contact Info
              </label>
              <input
                type="text"
                name="contact_info"
                value={patientDetails.contact_info}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter contact number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergency_contact"
                value={patientDetails.emergency_contact}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter emergency contact"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Room Number
              </label>
              <input
                type="text"
                name="room_number"
                value={patientDetails.room_number}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter room number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Bed Number
              </label>
              <input
                type="text"
                name="bed_number"
                value={patientDetails.bed_number}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter bed number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Floor Number
              </label>
              <input
                type="text"
                name="floor_number"
                value={patientDetails.floor_number}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter floor number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Diseases
              </label>
              <textarea
                name="diseases"
                value={patientDetails.diseases}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter diseases (if any)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              ></textarea>
            </div>

            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={patientDetails.allergies}
                onChange={(e) => handleInputChange(e)}
                placeholder="Enter allergies (if any)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Diet Chart</h2>

            {["morning_meal", "evening_meal", "night_meal"].map((meal) => (
              <div key={meal} className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700 capitalize">
                  {meal.replace("_", " ")}
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Meal Name
                  </label>
                  <input
                    type="text"
                    value={patientDetails.diet_chart_data[meal].meal_name}
                    onChange={(e) => handleInputChange(e, meal, "meal_name")}
                    placeholder="Enter meal name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ingredients
                  </label>
                  <textarea
                    value={patientDetails.diet_chart_data[meal].ingredients}
                    onChange={(e) => handleInputChange(e, meal, "ingredients")}
                    placeholder="Enter ingredients, separated by commas"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instructions
                  </label>
                  <textarea
                    value={patientDetails.diet_chart_data[meal].instructions}
                    onChange={(e) => handleInputChange(e, meal, "instructions")}
                    placeholder="Enter instructions"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              General Instructions
            </label>
            <textarea
              name="general_instructions"
              value={patientDetails.general_instructions}
              onChange={(e) => handleInputChange(e)}
              placeholder="Enter any general instructions"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
