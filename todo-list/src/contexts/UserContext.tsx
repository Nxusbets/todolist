"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface UserContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // ✅ Asegurar que loading se actualice
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut().then(() => setUser(null));
  };

  return (
    <UserContext.Provider value={{ user, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}
