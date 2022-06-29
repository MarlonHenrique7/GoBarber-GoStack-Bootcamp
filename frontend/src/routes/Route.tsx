import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

const PrivateRoute: React.FC<any> = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
