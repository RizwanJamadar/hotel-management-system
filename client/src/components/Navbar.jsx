import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

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
          <Link
            to="/assign-task"
            className="py-1 text-white hover:text-indigo-200 transition duration-300"
          >
            Assign Task
          </Link>
          <Link
            to="/check-status"
            className="py-1 text-white hover:text-indigo-200 transition duration-300"
          >
            Check Status
          </Link>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium mx-auto">
        <Link to="/add-employee" className="text-white hover:text-indigo-200">
          Add Employee
        </Link>
        <Link to="/add-patient" className="text-white hover:text-indigo-200">
          Add Patient
        </Link>
        <Link to="/assign-task" className="text-white hover:text-indigo-200">
          Assign Task
        </Link>
        <Link to="/check-status" className="text-white hover:text-indigo-200">
          Check Status
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
