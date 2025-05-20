import React from "react";
import "./globals.scss";
import { Inter } from "next/font/google";
import Header from "../../components/header";
import { ThemeProvider } from "../../components/theme-provider";
import Footer from "../../components/my-footer";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { defaultMetadata } from "../../lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head />
      <body
        className="container flex flex-col"
        style={{
          margin: "0 auto !important",
          padding: "0rem 1rem !important",
        }}
      >
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nasser Setti",
              url: "https://snasser.dev",
              jobTitle: "Full-Stack Developer & Digital Architect",
              sameAs: [
                "https://github.com/nasserbvb",
                "https://www.linkedin.com/in/nasser-setti/",
                "https://x.com/NBvBJS"
              ],
              knowsAbout: ["Web Development", "Software Architecture", "Full-Stack Development"]
            })
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default Layout;
