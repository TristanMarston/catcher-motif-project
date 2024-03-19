import type { Metadata } from 'next';
import { Sniglet } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const sniglet = Sniglet({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Catcher Motif Project',
    description: 'Created for an English 10 project about catcher in the rye.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={sniglet.className}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
