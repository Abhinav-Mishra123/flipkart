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

interface schemaType {
  email: string,
  address: string,
  telephone: boolean
}

export const metadata: Metadata = {
  applicationName: 'AM Store',
  title: "AM Store | Your One-Stop Online Shop for Quality Products at Affordable Prices",
  description: "Discover an incredible shopping experience at AM Store! From electronics and fashion to home essentials, we provide high-quality products with fast delivery and excellent customer service. Shop now and enjoy unbeatable deals on the best items online!",
  referrer: 'origin-when-cross-origin',
  keywords: ['AM Store', 'online shopping', 'e-commerce store', 'buy electronics', 'affordable fashion', 'quality home essentials', 'fast delivery', 'best online deals', 'shop online', 'top products'],
  authors: [{ name: 'Abhinav Mishra' }, { name: 'am store is created by abhinav mishra', url: 'https://avatars.githubusercontent.com/u/49057800?v=4' }],
  creator: 'Abhinav Mishra',
  publisher: 'AM Store Tech',
  robots:{
    index: true,
    follow:true,
    nocache:true,
    googleBot:{
      index:true,
      follow:true,
    }
  },
  icons:{
    icon:"/icon.png",
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  metadataBase: new URL("https://amstore.com"),
  alternates:{
    canonical:"/",
    languages:{
      "en-US": "/en-US"
    }
  },
openGraph: {
  title: "AM Store | Your One-Stop Online Shop for Quality Products at Affordable Prices",
  description: "Discover an incredible shopping experience at AM Store! From electronics and fashion to home essentials, we provide high-quality products with fast delivery and excellent customer service. Shop now and enjoy unbeatable deals on the best items online!"
},
  formatDetection:{
    email :"am6935789@gmail.com",
    address: "Sector-62 Noida, Uttar Pradesh, India",
    telephone: false,
  } as schemaType,
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
