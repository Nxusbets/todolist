"use client";

import React from "react";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <LoginForm onClose={() => {}} />
      <p style={{ marginTop: "1rem" }}>
        ¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link>
      </p>
    </div>
  );
}
