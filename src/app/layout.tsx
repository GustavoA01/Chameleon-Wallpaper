import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserratVariable = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chameleon",
  description: "Muda o wallpaper do computador de acordo com o tempo definido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        montserratVariable.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col dark">
        <header className="bg-primary">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-lg font-montserrat font-bold">Chameleon</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
