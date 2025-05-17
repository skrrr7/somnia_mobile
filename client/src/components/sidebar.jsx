import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  LightBulbIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
    },
    {
      name: 'Profile',
      icon: UserIcon,
      path: '/profile',
    },
    {
      name: 'Sleep Tips',
      icon: LightBulbIcon,
      path: '/sleep-tips',
    },
    {
      name: 'Notifications',
      icon: BellIcon,
      path: '/notifications',
    },
    {
      name: 'Help & Support',
      icon: QuestionMarkCircleIcon,
      path: '/help',
    },
    {
      name: 'Settings',
      icon: Cog6ToothIcon,
      path: '/settings',
    },
  ];

  const NavItem = ({ item }) => (
    <button
      onClick={() => navigate(item.path)}
      className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all duration-300 group relative
        ${location.pathname === item.path 
          ? 'bg-gradient-to-r from-blue-500/20 to-blue-400/10 text-blue-400 border-l-4 border-blue-500' 
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-white border-l-4 border-transparent'}`}
    >
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover:bg-blue-500/10
        ${location.pathname === item.path ? 'bg-blue-500/20' : ''}`}>
        <item.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
      </div>
      
      {!isCollapsed && (
        <span className="font-medium text-sm">{item.name}</span>
      )}
    </button>
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-gray-900/95 border-r border-gray-800/50 backdrop-blur-xl transition-all duration-300 ease-in-out z-20
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800/50">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400 font-semibold">S</span>
            </div>
            <span className="text-white font-medium">SOMNiA</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
        >
          {isCollapsed ? (
            <ChevronDoubleRightIcon className="w-5 h-5" />
          ) : (
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col h-[calc(100vh-4rem)] py-4">
        <div className="flex-1 space-y-1">
          {navigationItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 
            text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all duration-300 
            group relative border-l-4 border-transparent hover:border-red-500`}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 group-hover:bg-red-500/10">
            <ArrowRightOnRectangleIcon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          
          {!isCollapsed && (
            <span className="font-medium text-sm">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;