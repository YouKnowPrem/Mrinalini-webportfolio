import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const lora = Lora({
    subsets: ["latin"],
    variable: "--font-lora",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: "%s | Dr. Jane Doe",
        default: "Dr. Jane Doe - Historian & Researcher",
    },
    description: "Digital academic archive of Dr. Jane Doe. Publications, research, and writing on modern history.",
    keywords: ["history", "historian", "research", "academic", "portfolio"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
            <body className="antialiased min-h-screen flex flex-col pt-24 px-4 sm:px-8 md:px-16 lg:px-24">
                <Header />
                <main className="flex-grow max-w-5xl mx-auto w-full">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
