import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const RoutesApp: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
);
