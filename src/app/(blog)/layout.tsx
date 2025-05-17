
import "@/app/globals.css";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import TopBar from "@/components/common/TopBar";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
