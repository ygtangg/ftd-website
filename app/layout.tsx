import type { Metadata } from "next";
import { Forum, Arizonia } from "next/font/google";
import "./globals.css";

// Font definitions
const forum = Forum({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-forum',
});

const arizonia = Arizonia({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-arizonia',
});

export const metadata: Metadata = {
  title: "Fei Tian Dancers",
  description: "UC Berkeley Chinese Dance Team",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${forum.variable} ${arizonia.variable}`}>
                {children}
            </body>
        </html>
    );
}