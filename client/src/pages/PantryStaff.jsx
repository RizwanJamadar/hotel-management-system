import React, { useEffect, useState } from "react";
import axios from "axios";

const PantryStaff = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const token = sessionStorage.getItem("authToken"); // Retrieve the JWT token from session storage

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
              authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
          }
        );

        console.log(response);
        setTasks(response.data.tasks)
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching tasks.");
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
      <h1 className="text-2xl font-bold mb-4 text-center">Pantry Staff Tasks</h1>
      {tasks.map((task, index) => (
        <div key={task._id} className="border border-gray-300 rounded-lg p-4 mb-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Task {index + 1}</h2>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Staff ID:</strong> {task.staff_id}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>General Instructions:</strong> {task.diet_chart_id.general_instructions}
          </p>

          <div>
            <h3 className="text-md font-semibold mb-2">Preparation Status</h3>
            <ul className="list-disc list-inside mb-4">
              {Object.entries(task.preparation_status).map(([meal, status]) => (
                <li key={meal} className="text-gray-700">
                  <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {status}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Diet Chart</h3>
            {["morning_meal", "evening_meal", "night_meal"].map((mealKey) => {
              const meal = task.diet_chart_id[mealKey];
              return (
                <div key={mealKey} className="border border-gray-200 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold">{mealKey.replace("_", " ").toUpperCase()}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Meal Name:</strong> {meal.meal_name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Status:</strong> {meal.status}
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
        </div>
      ))}
    </div>
  );
};

export default PantryStaff;
