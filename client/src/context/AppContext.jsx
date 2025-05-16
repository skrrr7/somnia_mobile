import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// Set axios defaults once
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to check auth and get user data - only called when needed
  const checkAuthAndGetUserData = async (showErrors = true) => {
    try {
      setIsLoading(true);
      
      // Check if the user is authenticated
      const { data: authData } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (!authData.success) {
        setIsLoggedin(false);
        setUserData(null);
        return;
      }

      // If authenticated, get user data
      const { data: userResponse } = await axios.get(
        `${backendUrl}/api/user/data`,
        { withCredentials: true }
      );

      if (userResponse.success) {
        setIsLoggedin(true);
        setUserData(userResponse.userData);
      } else {
        setIsLoggedin(false);
        setUserData(null);
        if (showErrors) {
          toast.error('Failed to get user data');
        }
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
      
      if (showErrors && error.response?.status !== 401) {
        toast.error(error.response?.data?.message || 'Authentication check failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Clear user session
  const clearUserSession = () => {
    setIsLoggedin(false);
    setUserData(null);
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    isLoading,
    checkAuthAndGetUserData,
    clearUserSession
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};