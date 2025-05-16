import React from 'react';
import { motion } from 'framer-motion';
import {
  HeartIcon,
  ClockIcon,
  ChartBarIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const QuickAction = ({ icon: Icon, label, value, onClick, isActive = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center space-x-4 w-full ${
      isActive 
        ? 'bg-blue-500/20 border-blue-500/30' 
        : 'bg-gray-900/60 border-gray-800 hover:bg-gray-900/80'
    } rounded-2xl p-5 border hover:border-blue-500/30 transition-all duration-200`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
      isActive ? 'bg-blue-500/20' : 'bg-blue-500/10'
    }`}>
      <Icon className={`w-6 h-6 ${isActive ? 'text-blue-400' : 'text-blue-300'}`} />
    </div>
    <div className="flex-1">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  </motion.button>
);

const DashboardCard = ({ onActionClick, doctorName = "Dr. John", activeView = 'overview' }) => {
  const quickActions = [
    {
      icon: HeartIcon,
      label: "Health Overview",
      value: "View Patient Vitals",
      onClick: () => onActionClick('health'),
      id: 'health'
    },
    {
      icon: ClockIcon,
      label: "Sleep History",
      value: "Sleep Pattern Analysis",
      onClick: () => onActionClick('sleep'),
      id: 'sleep'
    },
    {
      icon: ChartBarIcon,
      label: "Statistics",
      value: "View Sleep Metrics",
      onClick: () => onActionClick('statistics'),
      id: 'statistics'
    },
    {
      icon: BeakerIcon,
      label: "AI Prediction",
      value: "Sleep Risk Analysis (TBA)",
      onClick: () => onActionClick('prediction'),
      id: 'prediction'
    }
  ];

  return (
    <div className="bg-gray-900/95 rounded-2xl border border-gray-800/50 backdrop-blur-xl">
      {/* Greeting Section */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl text-white font-light mb-2">
              {getGreeting()}, {doctorName}
            </h2>
            <p className="text-gray-400">
              Welcome to your medical dashboard. Here's your patient overview for today.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-green-500/10 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-400">System Active</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.id}
              icon={action.icon}
              label={action.label}
              value={action.value}
              onClick={action.onClick}
              isActive={activeView === action.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard; 