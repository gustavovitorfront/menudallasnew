import Head from 'next/head'
import { Providers } from '../providers'
import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    localStorage.removeItem('@menu-digital:term')
  }, [])

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
