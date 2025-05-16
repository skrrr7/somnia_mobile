import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const sleepData = [
  { day: 'Mon', hours: 6 },
  { day: 'Tue', hours: 7.5 },
  { day: 'Wed', hours: 5 },
  { day: 'Thu', hours: 8 },
  { day: 'Fri', hours: 6.5 },
  { day: 'Sat', hours: 7 },
  { day: 'Sun', hours: 6.8 },
];

const Statistics = () => {
  return (
    <div className="ml-60 bg-white rounded-2xl shadow-lg p-6 w-full max-w-250 text-gray-800">
      <h2 className="text-2xl font-semibold mb-6">Sleep Statistics</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Sleep</h3>
          <p className="text-3xl font-bold">6.8 hrs</p>
          <p className="text-sm text-gray-500">Average this week</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Sleep Efficiency</h3>
          <p className="text-3xl font-bold">87%</p>
          <p className="text-sm text-gray-500">Restfulness Score</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Sleep Onset</h3>
          <p className="text-3xl font-bold">22 min</p>
          <p className="text-sm text-gray-500">Time to fall asleep</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Insomnia Risk</h3>
          <p className="text-3xl font-bold text-red-500">73%</p>
          <p className="text-sm text-gray-500">Predicted probability</p>
        </div>
      </div>

      {/* Line Chart Below */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Sleep Duration (hrs)</h3>
        <div className="bg-gray-100 rounded-xl shadow-md p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
