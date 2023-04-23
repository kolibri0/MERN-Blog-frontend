import Layout from '../components/Layout'
import '../styles/index.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import * as React from 'react';
import type { AppProps } from 'next/app'
import { SocketContext, socket } from '../components/context/socket';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../types'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <ProSidebarProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProSidebarProvider>
      </Provider>
    </SocketContext.Provider>
  )
}

export default MyApp