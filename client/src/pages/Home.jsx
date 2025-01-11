import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Welcome to Diet Chart Maintainer
        </h1>
        <p className="text-gray-700 text-lg">
          Take charge of your health with our easy-to-use diet management app. 
          Track your meals, plan balanced diets, and achieve your fitness goals effortlessly.
        </p>
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
