'use client'

import { createContext, useEffect, useState } from "react";

export type AuthContent = {
    authData: any;
    updateAuthData: (data: any) => void;
    isReady: boolean;
};

export const AuthContext = createContext<AuthContent>({
    authData: {},
    updateAuthData: () => { },
    isReady: false
});

export const AuthProvider = ({ children }: any) => {
    const [authData, setAuthData] = useState();
    const [isReady, setIsReady] = useState(false);

    const updateAuthData = (data: any) => {
        setAuthData(data);
    }

    useEffect(() => {
        let oldAuthData = JSON.parse(localStorage.getItem('authData')!);
        if (!oldAuthData) {
            localStorage.setItem('authData', JSON.stringify({}));
            oldAuthData = {};
        }
        setAuthData(oldAuthData);
        setIsReady(true);

        return () => { };
    }, []);

    return (
        <AuthContext.Provider value={{ authData, updateAuthData, isReady }}>
            {children}
        </AuthContext.Provider>
    );
};
