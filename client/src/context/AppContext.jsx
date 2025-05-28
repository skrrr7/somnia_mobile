import { createContext, useState, useEffect } from "react";
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

  const checkAuthAndGetUserData = async (showErrors = true) => {
    try {
      setIsLoading(true);
      
      const { data: authData } = await axios.get(
        `${backendUrl}/api/auth/is-auth`,
        { withCredentials: true }
      );

      if (!authData.success) {
        setIsLoggedin(false);
        setUserData(null);
        return false;
      }

      const { data: userResponse } = await axios.get(
        `${backendUrl}/api/user/data`,
        { withCredentials: true }
      );

      if (userResponse.success) {
        setIsLoggedin(true);
        setUserData(userResponse.userData);
        return true;
      } else {
        setIsLoggedin(false);
        setUserData(null);
        if (showErrors) {
          toast.error('Failed to get user data');
        }
        return false;
      }
    } catch (error) {
      setIsLoggedin(false);
      setUserData(null);
      
      if (showErrors && error.response?.status !== 401) {
        toast.error(error.response?.data?.message || 'Authentication check failed');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { 
        withCredentials: true 
      });
      
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('/');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Logout failed');
      return false;
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    isLoading,
    checkAuthAndGetUserData,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};