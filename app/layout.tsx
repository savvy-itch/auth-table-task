import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css';
import { ReduxProvider } from './redux/provider';

// add TS types

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ICAP Take Home',
  description: 'App for displaying data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}