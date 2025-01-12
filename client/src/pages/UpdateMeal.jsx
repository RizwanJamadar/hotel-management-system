import { useState, useEffect } from "react";
import axios from "axios";

const UpdateMeal = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch tasks for pantry staff
    const fetchTasks = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACK_END}/meal/my-tasks`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdate = async () => {
    if (!selectedTaskId || !selectedMealType || !selectedStatus) {
      setMessage("Please select a task, meal type, and status.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_URL_BACK_END}/tasks/${selectedTaskId}`,
        {
          mealType: selectedMealType,
          status: selectedStatus,
        }
      );
      setMessage("Meal status updated successfully!");
      console.log("Response:", res.data);

      // Refresh tasks after update
      const updatedTasks = tasks.map((task) => {
        if (task._id === selectedTaskId) {
          task.diet_chart_id[`${selectedMealType}_meal`].status =
            selectedStatus;
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Failed to update meal status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">
        Update Meal Preparation Status
      </h1>

      {message && (
        <p
          className={`mb-4 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            <h2 className="text-lg font-bold mb-2 text-gray-800">
              Patient: {task.diet_chart_id.patient_id.name}
            </h2>
            <p className="text-sm text-gray-600">
              Room: {task.diet_chart_id.patient_id.room_number}, Bed:{" "}
              {task.diet_chart_id.patient_id.bed_number}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Disease: {task.diet_chart_id.patient_id.diseases} | Allergies:{" "}
              {task.diet_chart_id.patient_id.allergies}
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Meal Type
              </label>
              <select
                value={selectedMealType}
                onChange={(e) => setSelectedMealType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              >
                <option value="">-- Select Meal Type --</option>
                {["morning", "evening", "night"].map((mealType) => (
                  <option key={mealType} value={mealType}>
                    {mealType} -{" "}
                    {task.diet_chart_id[`${mealType}_meal`].meal_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none"
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedTaskId(task._id);
                handleUpdate();
              }}
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateMeal;
