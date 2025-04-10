import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import background from '../assets/background.jpeg';
import logo from '/src/assets/SOMNIA_LOGO.png';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedin, userData]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="max-w-md w-full rounded-lg shadow-lg p-8"
        style={{
          backgroundColor: 'rgba(15, 32, 78, 0.8)',
          boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.6)',
        }}
      >
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Somnia Logo"
            className="w-24 h-24 mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
          />
          <h2 className="text-white text-3xl font-light">Verify Your Email</h2>
          <p className="text-gray-300 mt-2">Enter the 6-digit code sent to your email.</p>
        </div>
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center space-y-6">
          <div className="flex space-x-3" onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                ref={el => inputRefs.current[index] = el}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border border-white bg-transparent text-white rounded-md text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
