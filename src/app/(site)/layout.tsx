import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// Every public page gets the navbar + footer. The admin area has its own layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
