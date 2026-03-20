import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { MessengerChat } from "@/components/MessengerChat";
import { ChatFloatingButton } from "@/components/ChatFloatingButton";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Law Firm — Justice in Detail. Results in Focus.",
  description: "Precision advocacy and strategic counsel for discerning clients.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CustomCursor />
        <Nav />
        {children}
        <Footer />
        <MessengerChat />
        <ChatFloatingButton />
      </body>
    </html>
  );
}
