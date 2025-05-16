import React from 'react';

const DashboardCard = ({ setActivation }) => {
  return (
    <div className="w-full max-w-250  ml-60 h-[200px] bg-white p-5 rounded-2xl shadow-lg">
      <div className="text-4xl tracking-wide text-gray-800">Welcome, John Doe</div>
      <div className="text-md text-gray-600 mt-1 italic">
        Take control of your nights — track, analyze, and improve your sleep with SOMNiA.
      </div>
      <div className="flex mt-8 gap-1">
        <button onClick={() => setActivation("Health Overview")} className="bg-black text-white px-4 py-2 rounded cursor-pointer">Health Overview</button>
        <button onClick={() => setActivation("Sleep History")} className="bg-black text-white px-4 py-2 rounded cursor-pointer">Sleep History</button>
        <button onClick={() => setActivation("Statistics")} className="bg-black text-white px-4 py-2 rounded cursor-pointer">Statistics</button>
        <button onClick={() => setActivation("AI Prediction")} className="bg-black text-white px-4 py-2 rounded cursor-pointer">AI Prediction</button>
      </div>
    </div>
  );
};

export default DashboardCard;
