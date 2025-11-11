import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  UserCircleIcon,
  ArrowLeftIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { userData } = useContext(AppContext);
  const [userSleepData, setUserSleepData] = useState({
    sleepGoal: '8 hours',
    bedtime: '22:00',
    age: 28,
    weight: '70 kg'
  });


  const SettingItem = ({ icon: Icon, title, description, action, type = "link", to }) => (
    <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors group">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-white">{title}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      {type === "toggle" ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      ) : to ? (
        <Link 
          to={to}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">{action}</span>
        </Link>
      ) : (
        <button className="text-gray-400 hover:text-white transition-colors">
          <span className="text-sm">{action}</span>
        </button>
      )}
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
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="p-2 bg-gray-900/50 text-gray-400 rounded-lg hover:bg-gray-800/50 hover:text-white transition-all duration-200 border border-gray-800/50"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-light text-white">Profile Settings</h1>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center">
              <UserCircleIcon className="w-16 h-16 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-white font-light">{userData.name}</h2>
              <div className="flex items-center justify-between">
                <p className="text-gray-400">{userData.email}</p>
                <Link 
                  to="/verify-email" 
                  className="px-5 py-1.5 mb-5 bg-blue-500/20 text-blue-400 text-sm rounded-lg border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 font-medium"
                >
                  Verify email
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
          <h3 className="text-xl text-white font-light mb-4">Account Settings</h3>
          <div className="space-y-4">
            <SettingItem 
              icon={KeyIcon} 
              title="Change Password" 
              description="Update your account password" 
              action="Change >"
              to="/reset-password"
            />
            {/*}
            <SettingItem 
              icon={DevicePhoneMobileIcon} 
              title="Connected Devices" 
              description="Manage your connected devices" 
              action="Manage >"
            />
            */}   
          </div>
        </div>  
        
      </motion.div>
    </div>
  );
};

export default Profile;