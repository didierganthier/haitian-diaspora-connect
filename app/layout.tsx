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
        <meta property="og:image" content="https://scontent-mrs2-2.cdninstagram.com/v/t51.29350-15/456483326_890715816233755_297696648517326514_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-mrs2-2.cdninstagram.com&_nc_cat=107&_nc_ohc=l7cOrBQwpx4Q7kNvgHOuVO4&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzQ0MTcyNjQzNjA0ODM0MDEwMQ%3D%3D.2-ccb7-5&oh=00_AYDvzyI3LMRshJbTxpCsMHsHFdDUXiEGSrdn5AQ-RCjpEg&oe=66DB7300&_nc_sid=8f1549" />
        <meta property="og:url" content="https://haitian-diaspora-connect.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Haitian Diaspora Connect" />
        <meta name="twitter:description" content="Haitian Diaspora Connect is a social network for Haitians and friends of Haiti." />
        <meta name="twitter:image" content="https://scontent-mrs2-2.cdninstagram.com/v/t51.29350-15/456483326_890715816233755_297696648517326514_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-mrs2-2.cdninstagram.com&_nc_cat=107&_nc_ohc=l7cOrBQwpx4Q7kNvgHOuVO4&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=MzQ0MTcyNjQzNjA0ODM0MDEwMQ%3D%3D.2-ccb7-5&oh=00_AYDvzyI3LMRshJbTxpCsMHsHFdDUXiEGSrdn5AQ-RCjpEg&oe=66DB7300&_nc_sid=8f1549" />
      </head>
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
