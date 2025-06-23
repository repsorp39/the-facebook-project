import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isLoggedInSelector } from '../store/features/user-slice';

function PrivateRoutes() {
  const isLogin = useSelector(isLoggedInSelector);
  return (
      <>
        { 
          isLogin ? <Outlet /> : <Navigate to="/login" replace />
        }
      </>
  );
}

export default PrivateRoutes;