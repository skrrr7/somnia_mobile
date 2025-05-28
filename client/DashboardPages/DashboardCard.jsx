import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  ClockIcon,
  BeakerIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const ActionButton = ({ icon: Icon, text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="flex items-center space-x-3 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
  >
    <Icon className="w-5 h-5 text-blue-400" />
    <span className="text-white">{text}</span>
  </motion.button>
);

const DashboardCard = ({ setActivation }) => {
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : currentTime < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 p-8 rounded-2xl shadow-xl"
    >
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-4xl font-light text-white mb-2">{greeting}, Dr. John</h1>
          <p className="text-blue-200 text-lg">
            Monitor and analyze your patients' sleep patterns with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton
            icon={ChartBarIcon}
            text="Health Overview"
            onClick={() => setActivation("Health Overview")}
          />
          <ActionButton
            icon={ClockIcon}
            text="Sleep History"
            onClick={() => setActivation("Sleep History")}
          />
          <ActionButton
            icon={BeakerIcon}
            text="AI Analysis"
            onClick={() => setActivation("AI Analysis")}
          />
          <ActionButton
            icon={DocumentTextIcon}
            text="Medical Reports"
            onClick={() => setActivation("Medical Reports")}
          />
        </div>

        {/* Medical Alert Section */}
        <div className="mt-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="text-red-200">
              <span className="font-semibold">Alert:</span> 3 patients require immediate sleep pattern review
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
