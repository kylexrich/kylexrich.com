import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Outlet, Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
    // empty
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const userId = useSelector((state: RootState) => state.auth.userId);

    return userId ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
