"use client"

import Navbar from '@/components/Navbar'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Provider } from 'react-redux'
import { store, persistor } from '@/store/store'
import { CompContextProvider } from './context/store'
import { PersistGate } from 'redux-persist/integration/react'

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <link rel="icon" type='image/png' href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
      </head>
      <body className={poppins.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CompContextProvider>
              {children}
            </CompContextProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
