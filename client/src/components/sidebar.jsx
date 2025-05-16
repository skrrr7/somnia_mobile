import React from 'react';

const Sidebar = ({ setActivation }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 z-20 mt-20" >
      <div className="w-24 h-24 rounded-full bg-white mx-auto p-1 mb-2"></div>
      <div className="text-lg font-medium text-center mb-1">John Doe</div>
      <div className="text-green-400 text-sm text-center mb-6">Verified</div>

      <div className="text-center border border-slate-800 p-4 cursor-pointer hover:bg-gray-700 rounded">
        Dashboard
      </div>
    </div>
  );
};

export default Sidebar;
