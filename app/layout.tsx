import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AxonX Medtech — The Operating System for Modern Hospitals",
  description:
    "AxonX Medtech is an enterprise-grade Hospital Management System that unifies OPD, IPD, pharmacy, billing, and patient management into one intelligent platform. Trusted by 500+ hospitals.",
  keywords: [
    "hospital management system",
    "HMS software",
    "healthcare management",
    "hospital software",
    "OPD management",
    "IPD management",
    "pharmacy management system",
    "medical billing software",
    "patient management system",
    "healthcare SaaS",
    "HIPAA compliant HMS",
    "cloud hospital software",
  ],
  authors: [{ name: "AxonX Medtech" }],
  creator: "AxonX Medtech",
  publisher: "AxonX Medtech Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axonx.health",
    siteName: "AxonX Medtech",
    title: "AxonX Medtech — The Operating System for Modern Hospitals",
    description:
      "Enterprise-grade Hospital Management System. Unify OPD, IPD, pharmacy, billing, and patient management. Trusted by 500+ hospitals. Go live in 72 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AxonX Medtech Hospital Management System Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AxonX Medtech — The Operating System for Modern Hospitals",
    description:
      "Enterprise-grade Hospital Management System. Unify OPD, IPD, pharmacy, billing, and patient management.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AxonX Medtech",
              applicationCategory: "HealthApplication",
              operatingSystem: "Web",
              description:
                "Enterprise-grade Hospital Management System that unifies OPD, IPD, pharmacy, billing, and patient management.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free demo available",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "523",
                bestRating: "5",
              },
              provider: {
                "@type": "Organization",
                name: "AxonX Medtech Technologies",
                url: "https://axonx.health",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
