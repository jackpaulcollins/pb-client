'use client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider
    clientId="783783941258-m7cc9mb9rodak6hmsmlnv7kr0471tn5v.apps.googleusercontent.com"
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GoogleOAuthProvider>
  )
}
