import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from './_Component/Navbar/Navbar';
import Foter from './_Component/Foter/Foter';
import { Toaster } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UseProvider from "@/UseProvider";
import CountProvider from "@/CountProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import OrderProvider from "./(shop)/allorders/OrderProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased italic`}
      >
        <UseProvider>
          <OrderProvider>
            <CountProvider>
              <Navbar />
              <main className="p-5"></main>
              {children}
              <Toaster />
              <Foter />
            </CountProvider>
          </OrderProvider>
        </UseProvider>
      </body>
    </html>
  );
}
