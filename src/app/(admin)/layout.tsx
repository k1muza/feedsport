
import "@/app/globals.css";
import { AnimalProvider } from "@/context/AnimalContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import type { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <AuthProvider>
        <AuthGuard>
          <AnimalProvider>
            {children}
          </AnimalProvider>
        </AuthGuard>
      </AuthProvider>
  );
}
