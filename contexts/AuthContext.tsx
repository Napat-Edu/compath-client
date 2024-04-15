'use client'

import { createContext, useEffect, useState } from "react";

export type AuthContent = {
    authData: any;
    updateAuthData: (data: any) => void
};

export const AuthContext = createContext<AuthContent>({
    authData: {},
    updateAuthData: () => { }
});

export const AuthProvider = ({ children }: any) => {
    const [authData, setAuthData] = useState();

    const updateAuthData = (data: any) => {
        setAuthData(data);
    }

    useEffect(() => {
        const oldAuthData = JSON.parse(localStorage.getItem('authData')!);
        setAuthData(oldAuthData);

        return () => { };
    }, []);

    return (
        <AuthContext.Provider value={{ authData, updateAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};
