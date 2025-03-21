// FirebaseAuth.tsx
import React, { useEffect, useRef } from "react";
import { auth } from "@/firebase"; 
import * as firebaseui from "firebaseui";
import { EmailAuthProvider } from "firebase/auth"; 
import "firebaseui/dist/firebaseui.css";

const FirebaseAuth = () => {
  const uiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!uiRef.current) return;

    const ui = new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, {
      signInOptions: [EmailAuthProvider.PROVIDER_ID], // ✅ Solo login con email
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: () => false,
      },
    });

    
    return () => {
      ui.delete().catch((error) => console.error("Error al limpiar Firebase UI:", error));
    };
  }, []);

  return <div ref={uiRef} />;
};

export default FirebaseAuth;
