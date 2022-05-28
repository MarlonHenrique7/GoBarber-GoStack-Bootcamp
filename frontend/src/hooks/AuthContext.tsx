import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

interface AuthProviderData {
    children: React.ReactNode;
}

interface AuthState {
    token: string;
    userDeletedPassword: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderData> = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, userDeletedPassword: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    // const name = useMemo(() => {
    //     return { name: 'Marlon' };
    // }, []);

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const response = await api.post('sessions', {
                email,
                password,
            });

            const { token, userDeletedPassword } = response.data;

            localStorage.setItem('@GoBarber:token', token);
            localStorage.setItem(
                '@GoBarber:user',
                JSON.stringify(userDeletedPassword),
            );

            setData({ token, userDeletedPassword });
        },
        [],
    );

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.getIremoveItemtem('@GoBarber:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: data.userDeletedPassword, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
