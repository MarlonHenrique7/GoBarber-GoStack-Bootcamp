import React from 'react';

import { Navigate, NavigateProps, Outlet, OutletProps } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

const RestrictedRoutes: React.FC<NavigateProps | OutletProps> = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default RestrictedRoutes;
