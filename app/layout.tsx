import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haitian Diaspora Connect",
  description: "Haitian Diaspora Connect is a social network for Haitians and friends of Haiti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="Haitian Diaspora Connect" />
        <meta property="og:description" content="Haitian Diaspora Connect is a social network for Haitians and friends of Haiti." />
        <meta property="og:image" content="/haitian-guy-min.jpg" />
        <meta property="og:url" content="https://haitian-diaspora-connect.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Haitian Diaspora Connect" />
        <meta name="twitter:description" content="Haitian Diaspora Connect is a social network for Haitians and friends of Haiti." />
        <meta name="twitter:image" content="/haitian-guy-min.jpg" />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
