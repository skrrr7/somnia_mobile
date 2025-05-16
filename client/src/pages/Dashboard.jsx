import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import HealthOverview from '../../DashboardPages/HealthOverview';
import Sidebar from '../components/sidebar';
import DashboardCard from '../../DashboardPages/DashboardCard';
import Statistics from '../../DashboardPages/Statistics';

const Dashboard = () => {
  const [activation, setActivation] = useState("Health Overview");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      <div className="flex max-w-screen-xl mx-auto px-8 py-10">
        <Sidebar />
        <div className="flex-1 mt-20">
          <DashboardCard setActivation={setActivation} />
          <div className="mt-8">
            {activation === "Health Overview" && <HealthOverview />}
            {activation === "Sleep History" && <div>Sleep History Content</div>}
            {activation === "Statistics" && <Statistics/>}
            {activation === "AI Prediction" && <div>AI Prediction Content</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
