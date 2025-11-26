import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Slej de Procteurs | Proctor + Stevenson',
  themeColor: '#42010B',
  description: `Discover the mysterious scent of good tidings and festive magic. Slej de Procteurs is not just an eau de parfum, it's a veritable buffet of delectable feelings`,
};

const gotham = localFont({
  variable: '--font-gotham',
  src: [
    {
      path: './fonts/Gotham/Gotham-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Gotham/Gotham-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Gotham/Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gotham/Gotham-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Gotham/Gotham-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dbc8cnl.css" />
        <Script
          strategy="beforeInteractive"
          src={`https://cdn-cookieyes.com/client_data/95079140c7648ed9ac2775844b99666a/script.js`}
        ></Script>
      </head>
      <body className={`antialiased ${gotham.variable} bg-[#42010B]`}>{children}</body>
    </html>
  );
}
