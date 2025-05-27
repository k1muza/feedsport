
import "@/app/globals.css";
import { AnimalProvider } from "@/context/AnimalContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AnimalProvider>
        {children}
      </AnimalProvider>
  );
}
