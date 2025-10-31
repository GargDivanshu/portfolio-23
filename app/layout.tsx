import type { Metadata } from "next";
import { Barlow, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-be-vietnam",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Divanshu Personal Website — The Explorer's Path",
  description:
    "Cinematic 2.5D portfolio concept showcasing Divanshu Garg's creative evolution across mystic realms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${beVietnam.variable} antialiased bg-[#05030f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
