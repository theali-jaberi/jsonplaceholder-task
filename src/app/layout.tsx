import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataHub - JSONPlaceholder Explorer",
  description:
    "A clean and responsive frontend application for exploring REST API data from JSONPlaceholder. Browse users, posts, and todos with a modern interface.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
    "JSONPlaceholder",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
          <Header />

          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
              {/* Hero Section */}
              <section className="text-center py-8 md:py-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                  Explore the{" "}
                  <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    API Data
                  </span>
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                  Browse users, posts, and todos from the JSONPlaceholder API. A
                  clean and responsive interface for exploring REST API data.
                </p>
              </section>

              {children}
            </div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
