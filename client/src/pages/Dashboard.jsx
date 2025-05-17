import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/sidebar.jsx';
import DashboardCard from '../components/DashboardCard';
import {
  HeartIcon,
  ClockIcon,
  FireIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';         

const StatCard = ({ icon: Icon, title, value, trend, trendValue, trendLabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/95 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-xl"
  >
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      {trend && (
        <div className={`flex items-center ${
          trend === 'up' ? 'text-green-500' : 'text-red-500'
        } bg-gray-900/50 px-3 py-1.5 rounded-full`}>
          {trend === 'up' ? (
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      )}
    </div>
    <div className="mt-4">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-2xl text-white font-light">{value}</div>
      {trendLabel && (
        <div className="text-sm text-gray-400 mt-1">{trendLabel}</div>
      )}
    </div>
  </motion.div>
);

const AIModelStatus = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/95 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-xl col-span-full"
  >
    <div className="flex items-center space-x-4 text-yellow-500 mb-6">
      <BeakerIcon className="w-8 h-8" />
      <h2 className="text-xl font-light">AI Prediction Model</h2>
    </div>
    <div className="flex items-center space-x-3 bg-yellow-500/10 p-4 rounded-xl">
      <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      <p className="text-yellow-400">
        The AI prediction model is currently under development. This feature will be available soon.
      </p>
    </div>
  </motion.div>
);

const SleepHistoryView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/95 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-xl"
  >
    <h2 className="text-xl text-white font-light mb-6">Sleep Pattern History</h2>
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="text-sm text-gray-400">Average Sleep Time</div>
          <div className="text-xl text-white mt-1">7.5 hours</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="text-sm text-gray-400">Sleep Efficiency</div>
          <div className="text-xl text-white mt-1">92%</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl">
          <div className="text-sm text-gray-400">Deep Sleep</div>
          <div className="text-xl text-white mt-1">2.3 hours</div>
        </div>
      </div>
      <div className="h-[300px] bg-gray-800/50 rounded-xl p-4 flex items-center justify-center text-gray-400">
        Sleep pattern graph will be displayed here
      </div>
    </div>
  </motion.div>
);

const StatisticsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-900/95 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-xl">
        <h3 className="text-lg text-white font-light mb-4">Weekly Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Average Sleep Score</span>
            <span className="text-white">85/100</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sleep Consistency</span>
            <span className="text-white">92%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sleep Debt</span>
            <span className="text-white">-1.2 hours</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/95 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-xl">
        <h3 className="text-lg text-white font-light mb-4">Monthly Trends</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sleep Quality Trend</span>
            <span className="text-green-500">↑ 5%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Deep Sleep Ratio</span>
            <span className="text-green-500">↑ 8%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Sleep Latency</span>
            <span className="text-red-500">↓ 12min</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/95 rounded-2xl p-6 border border-gray-800/50 backdrop-blur-xl">
        <h3 className="text-lg text-white font-light mb-4">Yearly Analysis</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Best Sleep Month</span>
            <span className="text-white">March</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Worst Sleep Month</span>
            <span className="text-white">December</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Year Progress</span>
            <span className="text-white">+15%</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const RiskLevelIndicator = ({ percentage }) => {
  const getColor = (value) => {
    if (value <= 30) return 'text-green-500';
    if (value <= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLabel = (value) => {
    if (value <= 30) return 'Low Risk';
    if (value <= 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/95 rounded-2xl p-8 border border-gray-800/50 backdrop-blur-xl col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl text-white font-light">AI Sleep Risk Analysis</h2>
        <div className={`px-4 py-1.5 rounded-full ${
          percentage <= 30 ? 'bg-green-500/10' : 
          percentage <= 60 ? 'bg-yellow-500/10' : 
          'bg-red-500/10'
        }`}>
          <span className={`text-sm font-medium ${getColor(percentage)}`}>
            {getLabel(percentage)}
          </span>
        </div>
      </div>
      <div className="flex items-end space-x-4 mb-6">
        <div className="text-5xl font-light text-white">{percentage}%</div>
        <div className={`text-lg ${getColor(percentage)} mb-1`}>Predicted Risk Level</div>
      </div>
      <div className="space-y-4">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              percentage <= 30 ? 'bg-green-500' : 
              percentage <= 60 ? 'bg-yellow-500' : 
              'bg-red-500'
            } transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm">
          Based on recent sleep patterns, heart rate variability, and activity levels
        </p>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [activeView, setActiveView] = useState('health ');

  const handleQuickAction = (action) => {
    setActiveView(action);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'health':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={HeartIcon}
              title="Average Heart Rate"
              value="68 bpm"
              trend="down"
              trendValue="-3 bpm"
              trendLabel="Lower than yesterday"
            />
            <StatCard
              icon={ClockIcon}
              title="Sleep Duration"
              value="7h 23m"
              trend="up"
              trendValue="+45m"
              trendLabel="Better than average"
            />
            <StatCard
              icon={ChartBarIcon}
              title="Sleep Quality"
              value="86%"
              trend="up"
              trendValue="+5%"
              trendLabel="Improved efficiency"
            />
            <StatCard
              icon={FireIcon}
              title="Calories Burned"
              value="2,847"
              trend="up"
              trendValue="+12%"
              trendLabel="Above daily goal"
            />
          </div>
        );
      case 'sleep':
        return <SleepHistoryView />;
      case 'statistics':
        return <StatisticsView />;
      case 'prediction':
        return <AIModelStatus />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={HeartIcon}
              title="Average Heart Rate"
              value="68 bpm"
              trend="down"
              trendValue="-3 bpm"
              trendLabel="Lower than yesterday"
            />
            <StatCard
              icon={ClockIcon}
              title="Sleep Duration"
              value="7h 23m"
              trend="up"
              trendValue="+45m"
              trendLabel="Better than average"
            />
            <StatCard
              icon={ChartBarIcon}
              title="Sleep Quality"
              value="86%"
              trend="up"
              trendValue="+5%"
              trendLabel="Improved efficiency"
            />
            <StatCard
              icon={FireIcon}
              title="Calories Burned"
              value="2,847"
              trend="up"
              trendValue="+12%"
              trendLabel="Above daily goal"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] font-['Inter']">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-800/10 via-transparent to-transparent" />

      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="p-8">
          {/* Dashboard Card */}
          <div className="mb-8">
            <DashboardCard 
              onActionClick={handleQuickAction} 
              activeView={activeView}
            />
          </div>

          {/* Dynamic Content */}
          <div className="mb-8">
            {renderActiveView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
