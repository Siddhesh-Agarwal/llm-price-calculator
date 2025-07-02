import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import Providers from "./providers";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const site_config = {
    url: "https://llmprice.fyi/",
    title: "LLM Price Calculator",
    description: "A Simple No-Nonsense LLM Price Calculator",
    author: "Siddhesh Agarwal",
    twitter_handle: "@Siddhesh0205",
    image: "/og.png"
};

export const metadata: Metadata = {
    title: site_config.title,
    description: site_config.description,
    metadataBase: new URL(site_config.url),
    authors: {
        name: site_config.author,
        url: "https://siddhesh-tech.vercel.app/",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
                suppressContentEditableWarning
                suppressHydrationWarning
            >
                <Analytics />
                <Providers>
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
