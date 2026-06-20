import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Genuine Property Developers",
  description: "Premium plotted developments in prime locations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>  {/* ← remove paddingTop */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}