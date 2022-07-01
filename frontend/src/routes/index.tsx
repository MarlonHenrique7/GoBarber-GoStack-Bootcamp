import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './Route';
import RestrictedRoutes from './RouteRedirect';

const RoutesApp: React.FC = () => (
    <Routes>
        <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    </Routes>
);

export default RoutesApp;
