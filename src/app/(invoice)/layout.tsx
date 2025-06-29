
import "@/app/globals.css";
import type { ReactNode } from 'react';

export default function InvoiceLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
      <>
        {children}
      </>
  );
}
