// apps/admin-dashboard/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ForgeTech Nobles | Admin",
    template: "%s | ForgeTech Nobles Admin",
  },
  description: "ForgeTech Nobles – website administration console.",
  icons: {
    icon: [
      { url: "/images/logo/logo2.png", sizes: "512x512" },
      { url: "/images/logo/logo2.png", sizes: "192x192" },
      { url: "/images/logo/logo2.png", sizes: "32x32" },
    ],
    shortcut: "/images/logo/logo2.png",
    apple: "/images/logo/logo2.png",
  },
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