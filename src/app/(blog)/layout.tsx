
import "@/app/globals.css";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import type { ReactNode } from 'react';

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
