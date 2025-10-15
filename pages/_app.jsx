// frontend/pages/_app.jsx
import '../styles/globals.css';          // <-- ojo al nombre del archivo (ver paso 2)
import Layout from '../components/Layout';
import { AuthProvider } from '../lib/auth';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
