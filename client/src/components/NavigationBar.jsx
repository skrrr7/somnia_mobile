import React, { useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/SOMNiA_LOGO.png';
import { Menu, Transition } from '@headlessui/react';
import {
  ChartBarIcon,
  ClockIcon,
  UserIcon,
  Cog6ToothIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContext);
  axios.defaults.withCredentials = true;

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

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Logout Error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full fixed top-0 bg-gray-900/40 backdrop-blur-xl border-b border-gray-800/50 h-16 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo and Brand */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="SOMNiA" className="h-10 w-10" />
            <span className="text-2xl font-light text-white tracking-wider">SOMNiA</span>
          </button>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <ChartBarIcon className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            <button 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <ClockIcon className="w-5 h-5" />
              <span>Sleep Tracking</span>
            </button>
            <button 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <BookOpenIcon className="w-5 h-5" />
              <span>Resources</span>
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {userData ? (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-3 text-white hover:text-gray-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-sm">
                    {userData.name.charAt(0)}
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
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={sendVerificationOtp}
                              className={`${
                                active ? 'bg-gray-800/50' : ''
                              } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                            >
                              <UserIcon className="w-4 h-4" />
                              <span>Verify Email</span>
                            </button>
                          )}
                        </Menu.Item>
                      )}
                      
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => navigate('/reset-password')}
                            className={`${
                              active ? 'bg-gray-800/50' : ''
                            } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                          >
                            <Cog6ToothIcon className="w-4 h-4" />
                            <span>Settings</span>
                          </button>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? 'bg-gray-800/50' : ''
                            } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 text-left`}
                          >
                            <UserIcon className="w-4 h-4" />
                            <span>Sign out</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => navigate('/register')}
                >
                  Sign Up
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
