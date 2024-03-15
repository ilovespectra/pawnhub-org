import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import { createBurnCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

// Define the PAWN token ID
const PAWN_TOKEN_ID = 'PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc';

type SendTransferRequestProps = {};

export const SendTransferRequest: FC<SendTransferRequestProps> = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notify({ type: 'error', message: `Wallet not connected!` });
      console.error('Send Transaction: Wallet not connected!');
      return;
    }

    try {
      // Fetch the associated token account for the wallet
      const account = await getAssociatedTokenAddress(new PublicKey(PAWN_TOKEN_ID), publicKey);

      // Create burn instruction
      const burnIx = createBurnCheckedInstruction(
        account, // Associated token account address
        new PublicKey(PAWN_TOKEN_ID), // Token mint address
        publicKey, // Owner's public key
        // Set the quantity to burn as per your requirement
        100000, // For example: burning 1 PAWN token
        // Adjust decimals according to your token's decimals
        5 // For example: 5 decimals
      );

      // Assemble transaction
      const transaction = new Transaction().add(burnIx);

      // Send the transaction
      const signature: TransactionSignature = await sendTransaction(transaction, connection);
      
      // Notify user
      notify({ type: 'success', message: `Transaction sent.`, txid: signature });
    } catch (error: any) {
      notify({ type: 'error', message: `Transaction failed!`, description: error?.message });
      console.error(`Transaction failed! ${error?.message}`);
    }
  }, [publicKey, connection, sendTransaction]);

  return (
    <div>
      <button
        className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[purple] to-[black] hover:from-pink-800 hover:to-purple-800 ... "
        // onClick={onClick} 
        disabled={!publicKey}
      >
        <div className="hidden group-disabled:block ">
          Wallet not connected
        </div>
        <span className="block group-disabled:hidden" >
          Sacrifice Pawn
        </span>
      </button>
    </div>
  );
};
