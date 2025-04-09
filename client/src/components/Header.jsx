import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import background from '../assets/background.jpeg';
import logo from '../assets/SOMNIA_LOGO.png';

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className="bg-blue-950 bg-opacity-100 p-10 rounded-lg text-center"
        style={{
          backgroundColor: 'rgba(15, 32, 78, 0.8)',
          boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.6)', // white glow effect
        }}
      >
        <img src={logo} alt="Somnia Logo" className="w-16 h-16 mx-auto mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'}}/>
        <h1 className="text-4xl font-bold">
          Welcome to SOMNIA{userData?.name ? `, ${userData.name}` : ', Developer!'}
        </h1>
        <p className="mt-2 text-lg font-light">
          SOMNiA: An AI-driven system for predicting the probability of having insomnia.
        </p>
      </div>
    </div>
  );
};

export default Header;
