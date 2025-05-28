import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';

const sleepData = [
  { date: 'Mon', sleepHours: 7.5, deepSleep: 2.3, remSleep: 1.8, lightSleep: 3.4 },
  { date: 'Tue', sleepHours: 6.8, deepSleep: 2.0, remSleep: 1.5, lightSleep: 3.3 },
  { date: 'Wed', sleepHours: 7.2, deepSleep: 2.2, remSleep: 1.7, lightSleep: 3.3 },
  { date: 'Thu', sleepHours: 8.0, deepSleep: 2.5, remSleep: 2.0, lightSleep: 3.5 },
  { date: 'Fri', sleepHours: 7.0, deepSleep: 2.1, remSleep: 1.6, lightSleep: 3.3 },
  { date: 'Sat', sleepHours: 7.8, deepSleep: 2.4, remSleep: 1.9, lightSleep: 3.5 },
  { date: 'Sun', sleepHours: 7.5, deepSleep: 2.3, remSleep: 1.8, lightSleep: 3.4 },
];

const HealthMetricCard = ({ title, value, unit, color, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4"
  >
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {value}
        <span className="text-gray-500 text-sm ml-1">{unit}</span>
      </p>
    </div>
  </motion.div>
);

const HealthOverview = () => {
  const sleepScore = 85;
  const insomniaRisk = 15;

  return (
    <div className="ml-60 p-6 space-y-6">
      {/* Sleep Score and Risk Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep Quality Score</h3>
          <div className="w-48 h-48 mx-auto">
            <CircularProgressbar
              value={sleepScore}
              text={`${sleepScore}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: '#4F46E5',
                textColor: '#1F2937',
                trailColor: '#E5E7EB',
              })}
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            Your sleep quality is {sleepScore >= 80 ? 'excellent' : 'good'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Insomnia Risk Assessment</h3>
          <div className="w-48 h-48 mx-auto">
            <CircularProgressbar
              value={insomniaRisk}
              text={`${insomniaRisk}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: insomniaRisk > 50 ? '#EF4444' : '#10B981',
                textColor: '#1F2937',
                trailColor: '#E5E7EB',
              })}
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            Your insomnia risk level is {insomniaRisk <= 30 ? 'low' : 'moderate'}
          </p>
        </motion.div>
      </div>

      {/* Sleep Stages Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sleep Stages Analysis</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="deepSleep"
                stackId="1"
                stroke="#4F46E5"
                fill="#4F46E5"
                name="Deep Sleep"
              />
              <Area
                type="monotone"
                dataKey="remSleep"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                name="REM Sleep"
              />
              <Area
                type="monotone"
                dataKey="lightSleep"
                stackId="1"
                stroke="#60A5FA"
                fill="#60A5FA"
                name="Light Sleep"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Sleep Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Sleep Duration</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sleepHours"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Sleep Hours"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Sleep Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-900">Optimal Sleep Schedule</h4>
            <p className="text-blue-700 mt-1">
              Based on your sleep patterns, we recommend going to bed at 10:30 PM and waking up at 6:30 AM.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h4 className="font-medium text-green-900">Sleep Environment</h4>
            <p className="text-green-700 mt-1">
              Maintain a room temperature between 18-20°C (64-68°F) for optimal sleep conditions.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-900">Lifestyle Adjustments</h4>
            <p className="text-purple-700 mt-1">
              Consider reducing screen time 2 hours before bedtime to improve sleep quality.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HealthOverview;
