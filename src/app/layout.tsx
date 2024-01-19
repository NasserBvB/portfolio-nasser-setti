import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AboutPage } from "schema-dts";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
const inter = Inter({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Portfolio - ABDENNASSER ES-SATI - NASSER SETTI",
  assets: ["https://snasser.dev/nasser.jpg"],
  description:
    "Portfolio of Abdennasser Es-sati aka Nasser Setti. Full-stack developer",
  abstract:
    "Portfolio of Abdennasser Es-sati aka Nasser Setti. Full-stack developer",
  keywords: [
    "Abdennasser Es-sati",
    "Nasser Setti",
    "Portfolio",
    "Full-stack developer",
    "React Professional",
    "Next.js Professional",
    "Node.js Professional",
    "TypeScript Professional",
    "JavaScript Professional",
    "HTML Professional",
    "CSS Professional",
    "SASS Professional",
    "Tailwind Professional",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "HTML Developer",
    "CSS Developer",
    "SASS Developer",
    "Tailwind Developer",
  ],
  icons: [
    {
      url: "https://snasser.dev/nasser.jpg",
      sizes: "32x32",
      type: "image/jpeg",
    },
  ],
  creator: "Abdennasser Es-sati",
  generator: "Next.js",
  category: "Portfolio",
  alternates: {
    canonical: "https://snasser.dev",
  },
  authors: [
    {
      name: "Abdennasser Es-sati",
      url: "https://github.com/nasserbvb",
    },
  ],
  metadataBase: new URL("https://snasser.dev"),
  twitter: {
    card: "summary_large_image",
    creator: "@NBvBJS",
    creatorId: "NBvBJS",
    description: "Portfolio of Abdennasser Es-sati aka Nasser Setti",
    images: "https://snasser.dev/nasser.jpg",
    site: "https://snasser.dev/",
    title: "Portfolio - ABDENNASSER ES-SATI - NASSER SETTI",
    siteId: "snasser.dev",
  },
  openGraph: {
    description: "Portfolio of Abdennasser Es-sati aka Nasser Setti",
    images: "https://snasser.dev/nasser.jpg",
    locale: "en_US",
    title: "Portfolio - ABDENNASSER ES-SATI - NASSER SETTI",
    type: "profile",
    url: "https://snasser.dev/",
    firstName: "Abdennasser",
    lastName: "Es-sati",
    siteName: "Portfolio - ABDENNASSER ES-SATI - NASSER SETTI",
    username: "Nasser Setti",
    countryName: "Morocco",
  },
  robots: "index, follow",
};

const inventor: AboutPage = {
  "@type": "AboutPage",
  name: "Abdennasser Es-sati aka Nasser Setti",
  abstract: "Portfolio of Abdennasser Es-sati aka Nasser Setti",
  alternateName: "Nasser Setti",
  author: "Abdennasser Es-sati",
  copyrightYear: new Date().getFullYear(),
  description: "Portfolio of Abdennasser Es-sati aka Nasser Setti",
  disambiguatingDescription:
    "Portfolio of Abdennasser Es-sati aka Nasser Setti",
  genre: "Portfolio",
  headline: "Portfolio of Abdennasser Es-sati aka Nasser Setti",
  image: "https://snasser.dev/nasser.jpg",
  keywords: [
    "Abdennasser Es-sati",
    "Nasser Setti",
    "Portfolio",
    "Full-stack developer",
    "React Professional",
    "Next.js Professional",
    "Node.js Professional",
    "TypeScript Professional",
    "JavaScript Professional",
    "HTML Professional",
    "CSS Professional",
    "SASS Professional",
    "Tailwind Professional",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "HTML Developer",
    "CSS Developer",
    "SASS Developer",
    "Tailwind Developer",
  ],
  thumbnailUrl: "https://snasser.dev/nasser.jpg",
  url: "https://snasser.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(inventor),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleTagManager gtmId="G-JTT5FG2YRK" />
    </html>
  );
}
