import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddPatient from "./pages/AddPatient.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import PantryStaff from "./pages/PantryStaff.jsx";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addPatient",
        element: <AddPatient />,
      },
      ,
      {
        path: "/add-employee",
        element: <AddEmployee />,
      },
      {
        path: "assign-task",
        element: <PantryStaff />,
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
