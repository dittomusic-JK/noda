import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk, Michroma } from "next/font/google";
import "./globals.css";
import "./tactical.css";
import "./components.css";
import "./hero-immersive.css";
import "./core-capabilities.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SessionProvider } from "@/components/providers/session-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-michroma",
});

export const metadata: Metadata = {
  title: {
    default: "NODA AI - Defense Autonomous Systems",
    template: "%s | NODA AI",
  },
  description: "World's deepest defense algorithm repository for collaborative autonomous systems. Open orchestrator enabling operators to manage mission effects, not individual systems.",
  keywords: ["defense AI", "autonomous systems", "algorithmic warfare", "multi-domain operations", "defense algorithms", "open orchestrator"],
  authors: [{ name: "NODA AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NODA AI",
    title: "NODA AI - Defense Autonomous Systems",
    description: "World's deepest defense algorithm repository for collaborative autonomous systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "NODA AI - Defense Autonomous Systems",
    description: "Open orchestrator for collaborative autonomous systems and algorithmic warfare",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${michroma.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <SessionProvider>
          <Nav />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
