"use client";

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "../firebase";

// Update UserContext to use FirebaseUser | null
export const UserContext = createContext<FirebaseUser | null>(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Directly store the firebaseUser object
    });

    return () => unsubscribe();
  },);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};