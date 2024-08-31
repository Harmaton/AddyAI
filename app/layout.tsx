import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/logo-mockup.png', sizes: 'any' },
      { url: '/logosvg.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  title: "AI-ADDY: Intelligent Document Processing",
  description: "AI-powered document processing, email automation, and CMS integrations for loan origination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >{children}</body>
    </html>
    </AuthProvider>
  );
}
