"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext";
import TodoList from "@/app/todolist/page";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Page() {
  const userContext = useContext(UserContext);
  const router = useRouter();

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm />
      <p className="mt-4">
        ¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link>
      </p>
    </div>
  );
}
