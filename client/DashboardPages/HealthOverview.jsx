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

const sampleData = [
  { name: 'Mon', steps: 3000 },
  { name: 'Tue', steps: 5000 },
  { name: 'Wed', steps: 4000 },
  { name: 'Thu', steps: 6000 },
  { name: 'Fri', steps: 7000 },
  { name: 'Sat', steps: 8000 },
  { name: 'Sun', steps: 6500 },
];

const HealthOverview = () => {
  return (
    <div className="ml-60 bg-white rounded-2xl shadow-lg p-6 w-full max-w-250 text-gray-800">
      <h2 className="text-2xl font-semibold mb-6">Today's Summary</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Steps</h3>
          <p className="text-3xl font-bold">69</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Heart Rate</h3>
          <p className="text-3xl font-bold">72 bpm</p>
          <p className="text-sm text-gray-500">Resting</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Sleep Duration</h3>
          <p className="text-3xl font-bold">69 hrs</p>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Calories Burned</h3>
          <p className="text-3xl font-bold">69 kcal</p>
        </div>
      </div>

      {/* Line Chart Below */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Weekly Steps Overview</h3>
        <div className="bg-gray-100 rounded-xl shadow-md p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="steps" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthOverview;
