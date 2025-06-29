
import "@/app/globals.css";
import { AnimalProvider } from "@/context/AnimalContext";
import type { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <AnimalProvider>
        {children}
      </AnimalProvider>
  );
}
