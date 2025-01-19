import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes"
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
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
}

export const metadata: Metadata = {
  title: site_config.title,
  description: site_config.description,
  metadataBase: new URL(site_config.url),
  authors: {
    name: site_config.author,
  },
  twitter: {
    title: site_config.title,
    description: site_config.description,
    creator: site_config.author,
    creatorId: site_config.twitter_handle,
    card: "summary_large_image",
  },
  openGraph: {
    siteName: site_config.title,
    title: site_config.title,
    description: site_config.description,
    url: site_config.url,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-slate-800`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem
          enableColorScheme
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
