import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn to read a company — StockSense",
  description:
    "A free seven-level course for beginners: shares, company accounts, financial ratios, portfolio building and staying rational in a falling market. Educational only, using invented companies.",
};

export const viewport: Viewport = {
  themeColor: "#062a1c",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        {/* Apply the saved (or system) theme before paint so there is no flash
            of the wrong palette. Same storage key as StockSense, though the
            two sites are separate origins and do not share it. */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              'try{var t=localStorage.getItem("stocksense.theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}',
          }}
        />
        {children}
      </body>
    </html>
  );
}
