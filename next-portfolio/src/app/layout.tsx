import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Gitansh Bhange | Full Stack Developer",
  description: "Cinematic, luxury-inspired developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} font-sans antialiased bg-bg-dark-base text-glassy-blue`}
      >
        {children}
      </body>
    </html>
  );
}
