import { Keypair } from "@solana/web3.js";
import { SendTransferRequest } from "components/SendTransferRequest";
import { TransferRequestQR } from "components/TransferRequestQR";
import useTransactionListener from "hooks/useTransactionListener";
import type { NextPage } from "next";
import { useMemo } from "react";

const keypair = "7cFavLSqPDgU6RVQt1sa2GpjVXeDssU4sef68VDbfc2E"
const Transfer: NextPage = () => {
  // Generate a public key that will be added to the transaction
  // so we can listen for it
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  // Listen for transactions with the reference
  // useTransactionListener(reference);

  return (
    
    <div className="hero-container">
      <div className="container">
      <div className="hero rounded-3xl bg-black mt-2 bg-opacity-60" style={{ border: '4px solid purple' }}>
        <div className="hero-content bg-black rounded-2xl text-center p-4">
          <img src="/pawnboi.png" alt="Pawnboi" className="mx-auto mb-4" style={{ width: '200px', height: 'auto'}} />
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">PAWN Sacrifice</h1>
            <SendTransferRequest />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Transfer;
