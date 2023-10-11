'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './contexts/AuthProvider';
import { DateProvider } from './contexts/DateProvider';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
      <GoogleOAuthProvider
        clientId="783783941258-m7cc9mb9rodak6hmsmlnv7kr0471tn5v.apps.googleusercontent.com"
        >
        <html lang="en">
          <body className={inter.className}>
            <AuthProvider>
              <DateProvider>
                {children}
              </DateProvider>
            </AuthProvider>
          </body>
        </html>
      </GoogleOAuthProvider>
  )
}
