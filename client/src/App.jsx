import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddPatient from "./pages/AddPatient.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import PantryStaff from "./pages/PantryStaff.jsx"; // Import the ProtectedRoute component
import UpdateMeal from "./pages/UpdateMeal.jsx";


const ProtectedRoute = ({ children }) => {
  const user = sessionStorage.getItem("authToken"); // Check for auth token in session storage

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected component if authenticated
};


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addPatient",
        element: (
          <ProtectedRoute>
            <AddPatient />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-employee",
        element: (
          <ProtectedRoute>
            <AddEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "assign-task",
        element: (
          <ProtectedRoute>
            <PantryStaff />
          </ProtectedRoute>
        ),
      },
      {
        path:"check-status",
        element:(
          <ProtectedRoute>
            <UpdateMeal/>
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn />,
  },
]);

// Provide the router to the application
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
