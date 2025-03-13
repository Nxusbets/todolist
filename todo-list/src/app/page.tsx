"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import TodoList from "@/app/todolist/page";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Page() {
  const userContext = useContext(UserContext);
  const router = useRouter();

  // ✅ Mueve la verificación de userContext dentro del useEffect
  useEffect(() => {
    if (!userContext) {
      console.error("Error: UserContext no está disponible.");
      return;
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch((err) => console.error("Error registrando Service Worker", err));
    }
  }, [userContext]);

  if (!userContext) {
    return <p>Error: UserContext no está disponible.</p>;
  }

  const { user, loading } = userContext;

  useEffect(() => {
    if (!loading && user) {
      router.replace("/todolist"); // Evita redirecciones infinitas
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return user ? (
    <TodoList />
  ) : (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <LoginForm />
      <p className="mt-4">
        ¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link>
      </p>
    </div>
  );
}
