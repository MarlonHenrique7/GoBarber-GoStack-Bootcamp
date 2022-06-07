import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';

interface data {
    children: React.ReactNode;
}

const AppProvider: React.FC<data> = ({ children }) => (
    <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
);

export default AppProvider;
