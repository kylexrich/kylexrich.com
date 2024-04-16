import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAppSelector} from '../../../hooks/reduxHooks.tsx';
import {RootState} from '../../../redux/store.ts';

export interface ProtectedRouteProps {
    // empty
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    const userId = useAppSelector((state: RootState) => state.auth.userId);

    return userId ? <Outlet/> : <Navigate to="/"/>;
};

export default ProtectedRoute;
