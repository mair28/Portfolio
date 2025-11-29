import type { Metadata } from "next";
import { Space_Grotesk, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Omair Malic | Freelance Python Expert & Fullstack Web Developer",
  description: "Freelance Python developer in the Philippines specializing in web scraping, automation, and full-stack web development. Building powerful tools and modern applications.",
  keywords: ["Python Developer", "Web Scraping", "Full-Stack Developer", "FastAPI", "React", "Next.js", "Freelance", "Philippines"],
  authors: [{ name: "Omair Malic" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Omair Malic | Freelance Python Expert & Fullstack Web Developer",
    description: "Freelance Python developer in the Philippines specializing in web scraping, automation, and full-stack web development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
