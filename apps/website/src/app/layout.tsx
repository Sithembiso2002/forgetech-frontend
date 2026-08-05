import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/footer/Footer";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import BackToTop from "@/components/ui/BackToTop";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "ForgeTech Nobles | Smart Systems. Real Results.",
  description:
    "ForgeTech Nobles provides end‑to‑end technology solutions – infrastructure, custom software, cloud, analytics, IT support, and digital consulting for businesses in Lesotho.",
  icons: {
    icon: [
      { url: "/images/logo/logo1.png", sizes: "16x16", type: "image/png" },
      { url: "/images/logo/logo1.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo/logo1.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/images/logo/logo1.png",
    apple: "/images/logo/logo1.png",
  },
  openGraph: {
    title: "ForgeTech Nobles – Integrated Digital Solutions",
    description:
      "Smart Systems. Real Results. Full‑stack technology partner based in Maseru, Lesotho.",
    url: "https://forgetechnobles.vercel.app",
    siteName: "ForgeTech Nobles",
    images: [
      {
        url: "https://forgetechnobles.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_LS",
    type: "website",
  },

  verification: {
    google: "TTsIfO7JJMeY8_iuP3ePaCUUKN--3Jwu6ABpLKekBQQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-brand-navy font-sans">
        <Navbar />
        <Breadcrumbs />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <BackToTop />
        
        {/* JSON‑LD structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "ForgeTech Nobles",
              description:
                "Full‑stack technology partner based in Maseru, Lesotho, offering IT infrastructure, custom software, cloud solutions, data analytics, IT support, and digital consulting.",
              url: "https://forgetechnobles.vercel.app",
              telephone: "+266 6301 3383",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Lesotho Housing and Land Development Corporation, MFQH+FMP",
                addressLocality: "Maseru",
                addressCountry: "LS",
              },
              openingHours: "Mo-Fr 08:00-17:00",
              areaServed: "Maseru,100,Lesotho",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Technology Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "IT Infrastructure & Networking",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom Software Development",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cloud Solutions",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Data Analytics & BI",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "IT Support Services",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Digital Transformation Consulting",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}