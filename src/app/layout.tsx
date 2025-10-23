import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALNORAS INTEGRATED CO. LTD",
  description: "From Sudan to the world and vice versa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
