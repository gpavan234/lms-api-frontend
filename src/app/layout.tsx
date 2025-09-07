import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Navbar on all pages */}
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
