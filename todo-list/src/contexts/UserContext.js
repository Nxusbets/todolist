'use client'
import React, { createContext, useState, useEffect } from 'react';
import { auth, analytics } from '../firebase';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authInitialized, setAuthInitialized] = useState(false); // Add state for auth initialization

    useEffect(() => {
        const initAuth = async () => { // Define a function to initialize auth
            await new Promise(resolve => { // Wait for auth to be ready
                const unsubscribe = auth.onAuthStateChanged(() => {
                    setAuthInitialized(true); // Set authInitialized to true
                    unsubscribe();
                    resolve();
                });
            });
        };

        initAuth(); // Call the function to initialize auth
    },);

    useEffect(() => {
        if (authInitialized) { // Check if auth is initialized
            const unsubscribe = auth.onAuthStateChanged(userAuth => {
                setUser(userAuth);
            });
            return unsubscribe;
        }
    }, [authInitialized]); // Dependency on authInitialized

    return (
        <UserContext.Provider value={{ user, analytics }}>
            {children}
        </UserContext.Provider>
    );
};