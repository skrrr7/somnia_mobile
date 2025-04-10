import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import background from '../assets/background.jpeg';
import logo from '/src/assets/SOMNIA_LOGO.png';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setUserData, getUserData } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/login',
        { email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (data.success) {
        // Store token in localStorage if needed (optional)
        localStorage.setItem('token', data.token);

        // Store userData in context
        setUserData(data.userData);
        setIsLoggedin(true);

        // Optionally re-fetch user data
        getUserData();

        toast.success('Login successful! Redirecting...');
        navigate('/');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login.');
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
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Somnia Logo"
            className="w-24 h-24 mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}
          />
          <h2 className="space-x-1 text-white text-5xl font-light">Login</h2>
        </div>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-white-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 space-x-1 text-white text-1xl font-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-white-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 space-x-1 text-white text-1xl font-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
