import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from '../utils/notifications';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Define the PAWN token ID
const PAWN_TOKEN_ID = 'PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc';

type SendTransferRequestProps = {
  reference: PublicKey,
};

export const SendTransferRequest: FC<SendTransferRequestProps> = ({ reference }) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // const onClick = useCallback(async () => {
  //   if (!publicKey) {
  //     notify({ type: 'error', message: `Wallet not connected!` });
  //     console.error('Send Transaction: Wallet not connected!');
  //     return;
  //   }

  //   let signature: TransactionSignature = '';
  //   try {
  //     const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

  //     // Transfer transaction
  //     const transaction = new Transaction({
  //       feePayer: publicKey,
  //       blockhash,
  //       lastValidBlockHeight,
  //     });

  //     // Replace the transfer instruction with the PAWN token transfer instruction
  //     // Replace the 'toPubkey' with the desired recipient's address
  //     // You can customize the lamports (amount) as per your requirements
  //     const transferInstruction = Token.createTransferInstruction(
  //       TOKEN_PROGRAM_ID,
  //       fromPublicKey,
  //       toPublicKey,
  //       ownerPublicKey,
  //       [],
  //       1000000 // Amount in lamports
  //     );

  //     transaction.add(transferInstruction);

  //     // Send the transaction
  //     await sendTransaction(transaction, connection);
  //   } catch (error: any) {
  //     notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
  //     console.error(`Transaction failed! ${error?.message}`, signature);
  //     return;
  //   }
  // }, [publicKey, connection, reference, sendTransaction]);

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
          Coming Soon...
        </span>
      </button>
    </div>
  );
};
