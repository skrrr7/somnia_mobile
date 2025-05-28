import React, { useContext, Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/SOMNiA_LOGO.png';
import { Menu, Transition, MenuItem } from '@headlessui/react';
import {
  HomeIcon,
  InformationCircleIcon,
  BuildingOfficeIcon,
  UserIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, isLoggedin, logout } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const scrollToSection = (sectionId) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(backendUrl + `/api/auth/send-verify-otp`);
      if (data.success) {
        toast.success(data.message);
        navigate('/verify-email');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('OTP Error:', error);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Render auth buttons when not logged in
  const renderAuthButtons = () => {
    if (isLoggedin) {
      return null;
    }

    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="text-white hover:text-blue-400 transition-colors text-sm"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Sign Up
        </button>
      </div>
    );
  };

  // Only render user menu if actually logged in
  const renderUserMenu = () => {
    if (!isLoggedin || !userData) {
      return null;
    }

    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-sm">
            {userData.name?.charAt(0)}
          </div>
          <span className="text-sm">{userData.name}</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-900/90 backdrop-blur-xl shadow-lg ring-1 ring-gray-800/50 divide-y divide-gray-800/50">
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400">Signed in as</p>
              <p className="text-sm text-white truncate">{userData.email}</p>
            </div>

            <div className="py-1">
              {!userData.isAccountVerified && (
                <MenuItem>
                  {({ isActive }) => (
                    <button
                      onClick={sendVerificationOtp}
                      className={`${
                        isActive ? 'bg-gray-800/50' : ''
                      } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                    >
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>Verify Email</span>
                    </button>
                  )}
                </MenuItem>
              )}
              
              <MenuItem>
                {({ isActive }) => (
                  <button
                    onClick={() => navigate('/profile')}
                    className={`${
                      isActive ? 'bg-gray-800/50' : ''
                    } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                )}
              </MenuItem>

              <MenuItem>
                {({ isActive }) => (
                  <button
                    onClick={() => navigate('/settings')}
                    className={`${
                      isActive ? 'bg-gray-800/50' : ''
                    } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                  >
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                )}
              </MenuItem>

              <MenuItem>
                {({ isActive }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      isActive ? 'bg-gray-800/50' : ''
                    } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                  >
                    <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                )}
              </MenuItem>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  return (
    <div className="w-full fixed top-0 bg-gray-900/40 backdrop-blur-xl border-b border-gray-800/50 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo and Brand */}
          <button 
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="SOMNiA" className="h-10 w-10" />
            <span className="text-2xl font-light text-white tracking-wider">SOMNiA</span>
          </button>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero-section')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Home</span>
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <InformationCircleIcon className="w-5 h-5" />
              <span>About</span>
            </button>
            <button 
              onClick={() => scrollToSection('why-choose')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              <span>Services</span>
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {renderAuthButtons()}
            {renderUserMenu()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
