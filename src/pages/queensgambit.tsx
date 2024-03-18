// BurnPage.tsx

import React from 'react';
import { NextPage } from "next";
import BurnTokenComponent from 'components/QueensGambit';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};
const app = initializeApp(firebaseConfig);

const BurnPage: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="mt-8">
        <div className="flex justify-center mt-4">
          {/* Pass firebaseApp to BurnTokenComponent */}
          <BurnTokenComponent firebaseApp={app} />
        </div>
      </div>
    </div>
  );
};

export default BurnPage;
