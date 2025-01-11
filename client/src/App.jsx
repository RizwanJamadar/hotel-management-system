import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx"
import Home from "./pages/Home.jsx"
import NotFound from "./pages/NotFound.jsx";
import AddPatient from "./pages/AddPatient.jsx"
import MainLayout from "./Layout/MainLayout.jsx";


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
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// Provide the router to the application
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;