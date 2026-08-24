import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Voice Command Mart",
    description: "A voice-controlled grocery store experience",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

import { ShoppingProvider } from '@/context/ShoppingContext';
import Script from 'next/script';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen`}>
                <ShoppingProvider>
                    {children}
                </ShoppingProvider>
                <div id="google_translate_element" style={{ display: 'none' }}></div>
                <Script id="google-translate-init" strategy="afterInteractive">
                    {`
                        function googleTranslateElementInit() {
                            new window.google.translate.TranslateElement({
                                pageLanguage: 'en',
                                includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as',
                                autoDisplay: false
                            }, 'google_translate_element');
                        }
                    `}
                </Script>
                <Script 
                    src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
                    strategy="afterInteractive" 
                />
            </body>
        </html>
    );
}
