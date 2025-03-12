// FirebaseAuth.tsx
import React, { useEffect, useRef } from 'react';
import { auth } from '../firebase'; // Importa la instancia de autenticación
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const FirebaseAuth = () => {
  const uiRef = useRef(null);

  useEffect(() => {
    if (!uiRef.current) {
      return;
    }

    const ui = new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, {
      signInOptions: [
        // Lista de proveedores de autenticación
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.GoogleAuthProvider.PROVIDER_ID,
        // Agrega otros proveedores según sea necesario
      ],
      // Otras configuraciones
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // Lógica después de un inicio de sesión exitoso
          return false; // Evita la redirección predeterminada
        },
      },
    });

    return () => {
      ui.delete(); // Limpia Firebase UI al desmontar el componente
    };
  }, []);

  return <div ref={uiRef} />;
};

export default FirebaseAuth;