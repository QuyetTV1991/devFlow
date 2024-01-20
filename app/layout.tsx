import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/prism.css";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotek = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotek",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devflow-quyettv1991.vercel.app/"),
  generator: "DevFlow",
  applicationName: "DevFlow",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript", "DevFlow"],
  authors: [{ name: "Quinlan", url: "https://github/QuyetTV1991" }],
  creator: "Quinlan",
  publisher: "Quinlan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    template: "%s | DevFlow",
    default: "DevFlow",
  },
  description:
    "Maximize your team's efficiency and accelerate project delivery with DevFlow, the ultimate development workflow management tool. Our feature-rich platform integrates seamlessly with popular version control systems, facilitating real-time collaboration, automated testing, and agile project management. Boost productivity, enhance code quality, and streamline your development processes with DevFlow. Try it today and revolutionize your development workflow!",
  openGraph: {
    title: "DevFlow",
    description: "Developer, writer, and creator.",
    url: "https://devflow-quyettv1991.vercel.app/",
    siteName: "DevFlow",
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: "DevFlow",
    card: "summary_large_image",
  },
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotek.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
