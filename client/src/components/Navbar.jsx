import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_BACK_END}/auth/logout`);
      localStorage.setItem("currentUser", null);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-16 md:h-20 bg-indigo-600 flex items-center justify-between px-4 md:px-8 lg:px-16">
      {/* LOGO */}
      <div className="flex items-center gap-2 text-2xl font-bold mx-4 lg:mx-auto">
        <Link to="/">
          <img
            src="/logo.png" // Replace with actual logo path
            alt="Logo"
            className="w-8 h-8"
          />
        </Link>
        <span className="text-white">DietFlow.</span>
      </div>

      {/* MOBILE MENU */}
      <div className="z-50 md:hidden">
        <img
          src={open ? "/close.svg" : "/menu.svg"} // Update the menu icon paths as needed
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setOpen(!open)}
        />
        <div
          className={`${
            !open ? "hidden" : "flex"
          } p-6 bg-indigo-700 absolute flex justify-end items-start flex-col top-20 right-0 mx-4 my-2 min-w-[150px] rounded-xl`}
        >
          {user?.role === "Manager" && (
            <>
              <Link
                to="/add-employee"
                className="py-1 text-white hover:text-indigo-200 transition duration-300"
              >
                Add Employee
              </Link>
              <Link
                to="/addPatient"
                className="py-1 text-white hover:text-indigo-200 transition duration-300"
              >
                Add Patient
              </Link>
            </>
          )}
          {(user?.role === "PantryStaff" ||
            user?.role === "DeliveryPersonnel") && (
            <Link
              to="/assign-task"
              className="py-1 text-white hover:text-indigo-200 transition duration-300"
            >
              Assign Task
            </Link>
          )}
          <Link
            to="/check-status"
            className="py-1 text-white hover:text-indigo-200 transition duration-300"
          >
            Check Status
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="px-2 py-1 bg-red-500 text-white font-normal rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium mx-auto">
        {user?.role === "Manager" && (
          <>
            <Link
              to="/add-employee"
              className="text-white hover:text-indigo-200"
            >
              Add Employee
            </Link>
            <Link to="/addPatient" className="text-white hover:text-indigo-200">
              Add Patient
            </Link>
          </>
        )}
        {(user?.role === "PantryStaff" ||
          user?.role === "DeliveryPersonnel") && (
          <Link
            to="/assign-task"
            className="text-white hover:text-indigo-200 transition duration-300"
          >
            Assign Task
          </Link>
        )}
        <Link to="/check-status" className="text-white hover:text-indigo-200">
          Check Status
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
