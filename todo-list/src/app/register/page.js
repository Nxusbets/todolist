"use client";

import React from 'react';
import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <RegisterForm />
            <p style={{ marginTop: '1rem' }}>
                ¿Ya tienes una cuenta? <Link href="/">Inicia sesión</Link>
            </p>
        </div>
    );
}