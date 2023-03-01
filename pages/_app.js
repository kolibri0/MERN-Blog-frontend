import Layout from '../components/Layout'
import '../styles/index.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export default function MyApp({ Component, pageProps }) {
  

    return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider> 
    )
  }