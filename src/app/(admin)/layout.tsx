
import "@/app/globals.css";
import { AnimalProvider } from "@/context/AnimalContext";
import { Comic_Neue } from 'next/font/google';
import type { ReactNode } from 'react';

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: "400",
});

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={comicNeue.className}>
      <AnimalProvider>
        {children}
      </AnimalProvider>
    </div>
  );
}
