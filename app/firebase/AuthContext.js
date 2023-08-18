'use client'
import {
    onAuthStateChanged,
    getAuth,
    signOut,  
    getFirestore,
} from 'firebase/auth';
import firebase_app from '@/app/firebase/config';
import { useState, useEffect, createContext, useContext } from 'react';

export const auth = getAuth(firebase_app);

export const AuthContext = createContext({});
export const SignMeOut = signOut(auth); 

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                window.localStorage.setItem("glimpseData", JSON.stringify(user)); 
            } else {
                setUser(null);
                window.localStorage.removeItem("glimpseData"); 
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};