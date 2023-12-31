// import './globals.css'
"use client"
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
