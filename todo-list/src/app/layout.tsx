import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../contexts/UserContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To do list",
  description: "Una app de NxuS",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body>
              <UserProvider>{children}</UserProvider>
          </body>
      </html>
  );
}