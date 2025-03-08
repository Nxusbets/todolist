"use client";

import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import TodoList from "@/components/TodoList";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
    const { user } = useContext(UserContext);
    console.log(user);

    if (user) {
        return (
            <>
                <Navbar />
                <TodoList />
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <LoginForm />
                <p style={{ marginTop: '1rem' }}>
                    ¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link>
                </p>
            </div>
            
        </>
    );
}