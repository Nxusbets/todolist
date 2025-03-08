"use client";

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Define the User interface
interface User {
  uid: string;
  // Add other user properties as needed
}

// Update UserContext to use User | null
export const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Create a User object with the uid property
        const userWithUid: User = {
          uid: firebaseUser.uid,
          // Add other user properties as needed
        };
        setUser(userWithUid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};