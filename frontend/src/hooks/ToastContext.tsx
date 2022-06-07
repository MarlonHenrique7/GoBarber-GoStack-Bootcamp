import React, { createContext, useContext, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastProviderData {
    // children: React.ReactNode;
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

interface ToastConfirm {
    children: React.ReactNode;
}

const ToastContext = createContext<ToastProviderData>({} as ToastProviderData);

const ToastProvider: React.FC<ToastConfirm> = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(
        ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
            const id = uuid();
            console.log(id);
            const toast = {
                id,
                type,
                title,
                description,
            };
            setMessages(state => [...state, toast]);
        },
        [],
    );

    const removeToast = useCallback((id: string) => {
        setMessages(state => state.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
};

function useToast(): ToastProviderData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };
