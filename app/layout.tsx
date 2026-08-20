import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: {
    default: "De Lambora — Considered Clothing",
    template: "%s — De Lambora",
  },

  description:
    "De Lambora creates considered everyday clothing with a focus on quality, comfort and timeless design.",

  keywords: [
    "De Lambora",
    "DeLambora",
    "clothing",
    "fashion",
    "shirts",
    "t-shirts",
    "polos",
    "hoodies",
    "premium clothing",
    "Indian clothing brand",
  ],

  authors: [
    {
      name: "De Lambora",
    },
  ],

  creator: "De Lambora",
  publisher: "De Lambora",

  metadataBase: new URL("https://delambora.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://delambora.com",
    siteName: "De Lambora",
    title: "De Lambora — Considered Clothing",
    description:
      "Considered everyday clothing designed with intention and made to be worn.",
  },

  twitter: {
    card: "summary_large_image",
    title: "De Lambora — Considered Clothing",
    description:
      "Considered everyday clothing designed with intention and made to be worn.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
