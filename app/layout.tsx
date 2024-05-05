import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ModelProvider } from "@/components/model-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { ToastProvider } from "@/components/toast-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genius",
  description: "AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body className={inter.className}>
          <ModelProvider></ModelProvider>
          <ToastProvider/>
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
