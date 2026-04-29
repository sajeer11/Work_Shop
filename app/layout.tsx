import { Suspense } from "react";
import type { Metadata } from "next";
import local from "next/font/local";
import Script from "next/script";
import "aos/dist/aos.css";

import AOSProvider from "./components/providers/AOSProvider";
import GoogleAnalytics from "./components/providers/GoogleAnalytics";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const geistSans = local({
  src: [
    {
      path: "../public/font/Prompt/Prompt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

const geistMono = local({
  src: [
    {
      path: "../public/font/Prompt/Prompt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
});

const promt = local({
  src: [
    {
  path: "../public/font/Prompt/Prompt-Regular.ttf",
  weight: "400",
  style: "normal",
},
{
  path: "../public/font/Prompt/Prompt-Bold.ttf",
  weight: "700",
  style: "bold",
},
{
  path: "../public/font/Prompt/Prompt-Italic.ttf",
  weight: "400",
  style: "italic",
},
  ],
  
  variable: "--font-prompt",
});

const plusJakartaSans = local({
  src: [
{
  path: "../public/font/Plus_Jakarta_Sans/PlusJakartaSans-Medium.ttf",
  weight: "500",
  style: "normal",
},
{
  path: "../public/font/Plus_Jakarta_Sans/PlusJakartaSans-BoldItalic.ttf",
  weight: "700",
  style: "bold",
}
  ],
  variable: "--font-plus",
});

export const metadata: Metadata = {
  title: "WorkShop - AI for Creatives",
  description: "Join us for an immersive experience where creativity meets AI. Discover how to harness the power of artificial intelligence to elevate your creative projects, streamline your workflow, and unlock new possibilities. Whether you're an artist, designer, writer, or simply curious about the intersection of creativity and technology, this workshop is designed to inspire and empower you. Don't miss out on this opportunity to explore the future of creativity with AI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${promt.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        ) : null}
        <AOSProvider />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
