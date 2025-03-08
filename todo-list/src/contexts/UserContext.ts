"use client";

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth"; // Import Firebase User
import { auth } from "../firebase";

// Define the User interface
interface User {
  uid: string;
  // Add other user properties as needed (displayName, email, etc.)
  displayName: string | null;
  email: string | null;
}

// Update UserContext to use User | null
export const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => { // Type firebaseUser
      if (firebaseUser) {
        // Create a User object with the uid and other properties
        const userWithUid: User = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
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
    <UserContext.Provider value= {{ user }
}>
  { children }
  </UserContext.Provider>
  );
};