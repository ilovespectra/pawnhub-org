import React, { useState, useEffect } from 'react';
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
  const [modalVisible, setModalVisible] = useState(true); // State to control modal visibility

  // Show modal when the page is refreshed
  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <div className="container mx-auto">
      {/* Modal */}
      <div className={`modal ${modalVisible ? 'visible' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
          <h2>Queens Gambit</h2>
          <p>Become a master - sacrifice PAWN to climb the ranks. Please be patient after initiating the burn, it may take some time. The image will update when the burn is complete!</p>
        </div>
      </div>

      {/* Main content */}
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
