import type { Metadata } from "next";
import local from "next/font/local";
import "aos/dist/aos.css";

import AOSProvider from "./components/providers/AOSProvider";
import "./globals.css";

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
  ],
  variable: "--font-prompt",
});

const plusJakartaSans = local({
  src: [
    {
      path: "../public/font/Prompt/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
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
        <AOSProvider />
        {children}
      </body>
    </html>
  );
}
