import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, checkAuthAndGetUserData } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedin) {
      checkAuthAndGetUserData(false);
    }
  }, []);

  if (!isLoggedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 