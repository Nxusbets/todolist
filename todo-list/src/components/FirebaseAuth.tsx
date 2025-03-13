// FirebaseAuth.tsx
import React, { useEffect, useRef } from "react";
import { auth } from "@/firebase"; // Asegúrate de que la ruta es correcta
import * as firebaseui from "firebaseui";
import { EmailAuthProvider } from "firebase/auth"; // ✅ Importar correctamente
import "firebaseui/dist/firebaseui.css";

const FirebaseAuth = () => {
  const uiRef = useRef<HTMLDivElement | null>(null); // ✅ Especificar tipo

  useEffect(() => {
    if (!uiRef.current) return;

    const ui = new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID, // ✅ Solo login con email
      ],
      signInFlow: "popup", // Evita redirecciones innecesarias
      callbacks: {
        signInSuccessWithAuthResult: () => false, // Evita redirección tras login
      },
    });

    return () => ui.delete(); // ✅ Limpiar UI al desmontar
  }, []);

  return <div ref={uiRef} />;
};

export default FirebaseAuth;
