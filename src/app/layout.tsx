import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{backgroundColor:"#f1f3f6"}}>
        <CartProvider>
        <AuthProvider>
            <div className="header-section sm:pr-8 sm:pl-8 pr-2 pl-2 bg-red-100">
              <Header/>
            </div>
            <div className="container mx-auto md:pr-4 md:pl-4 pr-3 pl-3">
              {children}
            </div>
        </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
