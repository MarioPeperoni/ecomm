import Footer from "@/components/store/Footer";
import Navbar from "@/components/store/navbar/Navbar";

export default async function DomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
