import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/Topbar'
import Provider from '@/components/Provider'
import {Toaster} from "react-hot-toast"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DocuChat',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode

}>) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <TopBar /> 
            {children}
          </body>
        </html>
          <Toaster/>
      </Provider>
    </ClerkProvider>
  )
}

