import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/SOMNiA_LOGO.png';

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
      console.error('OTP Error:', error); // Debug error
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

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
    <div className="w-full flex justify-between items-center p-4 sm:px-36 absolute top-0 bg-blue-950 h-23 z-50">
      <div className="flex items-center space-x-1 text-white text-5xl font-light">
        <span>S</span>
        <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
        <span>M</span>
        <span>N</span>
        <span>i</span>
        <span>A</span>
      </div>

      {userData ? (
        <div className="relative group text-white cursor-pointer">
          <div className="px-4 py-2 rounded hover:bg-blue-800 transition">
            {userData.name}
          </div>
          <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 invisible">
            {userData.isAccountVerified ? (
              <div className="px-4 py-2 hover:bg-gray-100 border-b">
                Account Verified
              </div>
            ) : (
              <div
                className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer"
                onClick={sendVerificationOtp}
              >
                Verify Email
              </div>
            )}

            <div
        className="px-4 py-2 hover:bg-gray-100 border-b cursor-pointer"
        onClick={() => navigate('/reset-password')}
      >
        Reset Password
      </div>

            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-950 hover:bg-blue-800 rounded-lg transition duration-300 text-white text-base font-light"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 bg-blue-950 hover:bg-blue-800 rounded-lg transition duration-300 text-white text-base font-light"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
