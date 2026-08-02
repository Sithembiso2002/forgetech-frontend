import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin | ForgeTech Nobles",
  description: "ForgeTech Nobles Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-neutral-offwhite text-neutral-charcoal">
        {children}
      </body>
    </html>
  );
}