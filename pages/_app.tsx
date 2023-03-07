import Layout from '../components/Layout'
import '../styles/index.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import * as React from 'react';
import type { AppProps } from 'next/app'
import '../types'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider> 
  )
}

export default MyApp