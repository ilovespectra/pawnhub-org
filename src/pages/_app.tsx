import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import { Layout } from 'components/Layout';

// Import necessary modules from Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig, 'my-custom-name');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pawn Hub</title>
        <meta
          name="description"
          content="Free Hardcore Pawn"
        />
      </Head>

      <ContextProvider>
        <div className="flex flex-col h-screen">
          <Notifications />
          <AppBar />
          <ContentContainer>
            <Layout>
              {/* Pass the Firebase app instance to the components */}
              <Component {...pageProps} firebaseApp={app} />
            </Layout>
          </ContentContainer>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
