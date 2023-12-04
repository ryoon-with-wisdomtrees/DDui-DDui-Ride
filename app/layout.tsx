import type { Metadata } from "next";
import { Inter, Nanum_Gothic_Coding, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/Header";

const googleFont = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "DDUI-DDUI Ride",
  description:
    "DDui-DDui-Ride(뛰뛰라이드) is a Full Stack NextJs 13 Uber Clone Web App w/ NextJs, React.js, Tailwindcss, Google Map, Stripe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={googleFont.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
