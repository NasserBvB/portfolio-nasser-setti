import React from "react";
import "./globals.scss";
import { Inter } from "next/font/google";
import Header from "../../components/header";
import { ThemeProvider } from "../../components/theme-provider";
import Footer from "../../components/my-footer";
import { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Nasser S. Portfolio",
  description:
    "Explore my portfolio to discover my professional journey, featured projects, mastered competencies, and insights on industry trends.",
  keywords: "portfolio, projects, experiences, blogs, skills",
  icons: [
    {
      rel: "icon",
      type: "image/jpeg",
      sizes: "32x32",
      url: "/nasser.jpg",
    },
    {
      rel: "icon",
      type: "image/jpeg",
      sizes: "16x16",
      url: "/nasser.jpg",
    },
  ],
};

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
