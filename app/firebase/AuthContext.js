'use client'
import {
    getAuth,
    getFirestore,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
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

    
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, [user]);

    return (
        <AuthContext.Provider  value={{ user, googleSignIn, logOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};


export const UserAuth = () => {
    return useContext(AuthContext);
  };