import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Match",
  description: "Human-in-the-loop matching for Singapore senior caregiving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
