import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dawit Workye | Full-Stack Engineer",
  description:
    "Full-stack engineer building scalable web applications with Next.js, PostgreSQL, and Redis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
