// _app.tsx

import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import { Layout } from 'components/Layout';

require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [selectedPriority, setSelectedPriority] = useState('min'); // Set default value for selectedPriority

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
          {/* Pass the selectedPriority prop to the AppBar component */}
          <AppBar setSelectedPriority={setSelectedPriority} />
          <ContentContainer>
            <Layout>
              {/* Pass the Firebase app instance to the components */}
              <Component {...pageProps}/>
            </Layout>
          </ContentContainer>
          <Footer />
        </div>
      </ContextProvider>
    </>
  );
};

export default App;
