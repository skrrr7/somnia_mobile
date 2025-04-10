import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import background from '../assets/background.jpeg';
import logo from '/src/assets/SOMNIA_LOGO.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setOtpSubmitted] = useState(false);

  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(''));
    setOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email, otp, newPassword });

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          backgroundColor: 'rgba(15, 32, 78, 0.8)', // Blue-950 with transparency
          boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.6)', // White glow
        }}
      >
        {/* Step 1: Enter Email */}
        {!isEmailSent && (
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="Somnia Logo"
              className="w-24 h-24 mx-auto mb-4"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
            />
            <h2 className="text-white text-3xl font-light mb-4">Reset Password</h2>
            <p className="text-white mb-6">Enter your registered email address</p>
            <form onSubmit={onSubmitEmail}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-white-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-white text-1xl font-light"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {!isOtpSubmitted && isEmailSent && (
  <form onSubmit={onSubmitOtp} className="text-center">
    <img
      src={logo}
      alt="Somnia Logo"
      className="w-24 h-24 mx-auto mb-4"
      style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
    />
    <h2 className="text-white text-3xl font-light mb-4">Reset Password OTP</h2>
    <p className="text-white mb-6">Enter the 6-digit code sent to your email address</p>
    
    <div className="flex justify-center space-x-2 mb-6" onPaste={handlePaste}>
      {Array(6).fill(0).map((_, index) => (
        <input
          key={index}
          ref={(e) => (inputRefs.current[index] = e)}
          onInput={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          type="text"
          maxLength="1"
          required
          className="w-12 h-12 text-center border rounded-md text-xl text-white bg-transparent border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
)}

        {/* Step 3: Enter New Password */}
        {isOtpSubmitted && isEmailSent && (
  <form onSubmit={onSubmitNewPassword} className="text-center">
    <img
      src={logo}
      alt="Somnia Logo"
      className="w-24 h-24 mx-auto mb-4"
      style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
    />
    <h2 className="text-white text-3xl font-light mb-4">New Password</h2>
    <p className="text-white mb-6">Enter your new password</p>
    <div className="mb-4">
      <input
        type="password"
        autoComplete="new-password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-white bg-transparent text-1xl font-light"
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Submit
    </button>
  </form>
)}

      </div>
    </div>
  );
};

export default ResetPassword;
