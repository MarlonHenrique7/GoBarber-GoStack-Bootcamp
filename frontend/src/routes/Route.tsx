import React from 'react';

import {
    Navigate,
    NavigateProps,
    Outlet,
    OutletProps,
    useLocation,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

const PrivateRoute: React.FC<NavigateProps | OutletProps> = () => {
    const { user } = useAuth();
    const location = useLocation();

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
