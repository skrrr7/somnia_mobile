import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import background from '../assets/background.jpeg';
import logo from '../assets/SOMNiA_LOGO.png';


const Register = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserData } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + '/api/auth/register',
        { name, email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (data.success) {
        toast.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div
  className="min-h-screen flex items-center justify-center"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', // Ensures background image covers the screen without stretching
    backgroundPosition: 'center', // Centers the background image
    backgroundAttachment: 'fixed', // Keeps the background fixed during scrolling (optional)
  }}
>
  <div
  className="max-w-md w-full rounded-lg shadow-lg p-8"
  style={{
    backgroundColor: 'rgba(15, 32, 78, 0.8)', // Blue-950 with transparency
    boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.6)', // White glow effect
  }}
>
    <div className="text-center mb-6">
      <img
        src={logo}
        alt="Somnia Logo"
        className="w-24 h-24 mx-auto mb-4"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}
      />
      <h2 className="space-x-1 text-white text-5xl font-light">Create Account</h2>
    </div>
    <form onSubmit={onSubmitHandler} className="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border border-white-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 space-x-1 text-white text-1xl font-light"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-white-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 space-x-1 text-white  text-1xl font-light"
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
        Register
      </button>
    </form>
  </div>
</div>

  );
};

export default Register;
