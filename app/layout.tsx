import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const site_config = {
  url: "https://llmprice.fyi/",
  title: "LLM Price Calculator",
  description: "A Simple No-Nonsense LLM Price Calculator",
  author: "Siddhesh Agarwal",
  twitter_handle: "@Siddhesh0205",
  image: "/og.png",
};

export const metadata: Metadata = {
  title: site_config.title,
  description: site_config.description,
  metadataBase: new URL(site_config.url),
  authors: {
    name: site_config.author,
    url: "https://siddhesh.cc/",
  },
  twitter: {
    title: site_config.title,
    description: site_config.description,
    creator: site_config.author,
    creatorId: site_config.twitter_handle,
    images: site_config.image,
    card: "summary_large_image",
  },
  openGraph: {
    siteName: site_config.title,
    title: site_config.title,
    description: site_config.description,
    url: site_config.url,
    images: site_config.image,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background`}
        suppressContentEditableWarning
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
