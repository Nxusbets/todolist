"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserProvider } from "@/contexts/UserContext";
import Layout from "@/components/Layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          <Layout>{children}</Layout> 
        </UserProvider>
      </body>
    </html>
  );
}
