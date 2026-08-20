import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: {
    default: "De Lambora — Contemporary Clothing",
    template: "%s — De Lambora",
  },
  description:
    "De Lambora — considered clothing made with intention. Explore our latest shirts, t-shirts, premium essentials and new collections.",
  keywords: [
    "De Lambora",
    "De Lambora clothing",
    "men's clothing",
    "shirts",
    "t-shirts",
    "premium clothing",
    "Indian clothing brand",
  ],
  authors: [{ name: "De Lambora" }],
  creator: "De Lambora",
  publisher: "De Lambora",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://delambora.com"
  ),
  openGraph: {
    title: "De Lambora — Contemporary Clothing",
    description:
      "Considered clothing made with intention. Explore De Lambora.",
    url: "https://delambora.com",
    siteName: "De Lambora",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "De Lambora — Contemporary Clothing",
    description:
      "Considered clothing made with intention. Explore De Lambora.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-bone antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
