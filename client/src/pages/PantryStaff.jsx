import React, { useEffect, useState } from "react";
import axios from "axios";

const PantryStaff = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        setError("Unauthorized access. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACK_END}/meal/my-tasks`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data.tasks);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Pantry Staff Tasks
      </h1>
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Task {index + 1}
          </h2>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Staff ID:</strong> {task.staff_id}
          </p>

          {/* Patient Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Patient Details
            </h3>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {task.diet_chart_id.patient_id.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Room:</strong> {task.diet_chart_id.patient_id.room_number}{" "}
              - Bed: {task.diet_chart_id.patient_id.bed_number}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Diseases:</strong>{" "}
              {task.diet_chart_id.patient_id.diseases}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Allergies:</strong>{" "}
              {task.diet_chart_id.patient_id.allergies}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Age:</strong> {task.diet_chart_id.patient_id.age} -{" "}
              <strong>Gender:</strong> {task.diet_chart_id.patient_id.gender}
            </p>
          </div>

          {/* Diet Chart */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Diet Chart</h3>
            <p className="text-sm text-gray-600 mb-2">
              <strong>General Instructions:</strong>{" "}
              {task.diet_chart_id.general_instructions}
            </p>

            {["morning_meal", "evening_meal", "night_meal"].map((mealKey) => {
              const meal = task.diet_chart_id[mealKey];
              return (
                <div
                  key={mealKey}
                  className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
                >
                  <h4 className="font-semibold text-blue-600">
                    {mealKey.replace("_", " ").toUpperCase()}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Meal Name:</strong> {meal.meal_name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Ingredients:</strong>
                  </p>
                  <ul className="list-disc list-inside pl-4 mb-2">
                    {meal.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-gray-700">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    <strong>Instructions:</strong> {meal.instructions}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Preparation Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Preparation Status
            </h3>
            <ul className="list-disc list-inside">
              {Object.entries(task.preparation_status).map(([meal, status]) => (
                <li
                  key={meal}
                  className={`text-gray-700 ${
                    status === "Completed"
                      ? "text-green-600"
                      : status === "In Progress"
                      ? "text-orange-600"
                      : status === "Pending"
                      ? "text-red-600"
                      : ""
                  }`}
                >
                  <strong>
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}:
                  </strong>{" "}
                  {status}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PantryStaff;
