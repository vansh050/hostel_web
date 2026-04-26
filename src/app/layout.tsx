import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND_NAME } from "@/data/hostels";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lalpurhostels.com"), // TODO: Replace with your actual domain
  title: {
    default: `Best Hostels in Ranchi | ${BRAND_NAME} - Affordable PG & Hostel for Boys & Girls in Lalpur`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Looking for hostels in Ranchi? Lalpur Hostels offers 3 affordable, clean, and safe hostels & PG near Lalpur Chowk, Ranchi. Boys & girls hostel with meals, Wi-Fi, 24/7 security. Starting Rs 3,000/month. Book now!",
  keywords: [
    "hostel in ranchi",
    "hostels in ranchi",
    "best hostel in ranchi",
    "girls hostel in ranchi",
    "boys hostel in ranchi",
    "PG in ranchi",
    "hostel in lalpur ranchi",
    "affordable hostel ranchi",
    "hostel near ranchi railway station",
    "student hostel ranchi",
    "working women hostel ranchi",
    "paying guest ranchi",
    "hostel with food ranchi",
    "cheap hostel ranchi",
    "safe girls hostel ranchi",
    "budget accommodation ranchi",
    "hostel in ranchi for students",
    "hostel near lalpur chowk ranchi",
    "hostel near ranchi main road",
    "girls PG in ranchi",
    "boys PG in ranchi",
    "PG near lalpur ranchi",
    "hostel for working women ranchi",
    "hostel for competitive exam ranchi",
  ],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND_NAME,
    title: `Best Hostels & PG in Ranchi | ${BRAND_NAME} - Boys & Girls Hostel in Lalpur`,
    description:
      "Safe, affordable boys & girls hostels & PG in Lalpur, Ranchi. Home-cooked meals, free Wi-Fi, 24/7 security. Starting Rs 3,000/month. Book now!",
  },
  twitter: {
    card: "summary_large_image",
    title: `Best Hostels in Ranchi | ${BRAND_NAME}`,
    description:
      "Safe, affordable boys & girls hostels in Lalpur, Ranchi. Starting Rs 3,000/month.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lalpurhostels.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
