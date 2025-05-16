import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BellIcon,
  MoonIcon,
  HeartIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    weight: '70 kg',
    height: '175 cm',
    sleepGoal: '8 hours',
    bedtime: '22:00',
    wakeTime: '06:00',
  });

  const [isEditing, setIsEditing] = useState(false);

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-lg text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-light text-white">Profile Settings</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        {/* User Info Section */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
              <UserCircleIcon className="w-16 h-16 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl text-white font-light">{userData.name}</h2>
              <p className="text-gray-400">{userData.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard icon={MoonIcon} title="Sleep Goal" value={userData.sleepGoal} />
            <StatCard icon={BellIcon} title="Bedtime" value={userData.bedtime} />
            <StatCard icon={HeartIcon} title="Age" value={userData.age} />
            <StatCard icon={ScaleIcon} title="Weight" value={userData.weight} />
          </div>
        </div>

        {/* Sleep Preferences */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-xl text-white font-light mb-4">Sleep Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
              <div>
                <p className="text-white">Bedtime Reminder</p>
                <p className="text-sm text-gray-400">Get notified before your target bedtime</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
              <div>
                <p className="text-white">Sleep Analysis</p>
                <p className="text-sm text-gray-400">Weekly sleep pattern analysis</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Connected Devices */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-xl text-white font-light mb-4">Connected Devices</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-white">Apple Watch Series 7</p>
                  <p className="text-sm text-gray-400">Connected • Last sync 2 mins ago</p>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-300 text-sm">Disconnect</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 