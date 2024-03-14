import { useLocalStorage } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Keypair, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { createBurnCheckedInstruction, TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";

// Removed the WALLET variable

const QUICKNODE_RPC = process.env.NEXT_PUBLIC_RPC_URL
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const MINT_ADDRESS = 'PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc'; 
const MINT_DECIMALS = 5; 
const BURN_QUANTITY = 1; 

(async () => {
    // Retrieve wallet from local storage
    const [wallet] = useLocalStorage('wallet', null);
    const walletKeyPair = Keypair.fromSecretKey(new Uint8Array(wallet));

    console.log(`Attempting to burn ${BURN_QUANTITY} [${MINT_ADDRESS}] tokens from Owner Wallet: ${walletKeyPair.publicKey.toString()}`);
    // Step 1 - Fetch Associated Token Account Address
    console.log(`Step 1 - Fetch Token Account`);
    const account = await getAssociatedTokenAddress(new PublicKey(MINT_ADDRESS), walletKeyPair.publicKey);
    console.log(`    ✅ - Associated Token Account Address: ${account.toString()}`);
    // Step 2 - Create Burn Instructions
    console.log(`Step 2 - Create Burn Instructions`);
    const burnIx = createBurnCheckedInstruction(
        account, // PublicKey of Owner's Associated Token Account
        new PublicKey(MINT_ADDRESS), // Public Key of the Token Mint Address
        walletKeyPair.publicKey, // Public Key of Owner's Wallet
        BURN_QUANTITY * (5 ** MINT_DECIMALS), // Number of tokens to burn
        MINT_DECIMALS // Number of Decimals of the Token Mint
    );
    console.log(`    ✅ - Burn Instruction Created`);
    // Step 3 - Fetch Blockhash
    console.log(`Step 3 - Fetch Blockhash`);
    const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash('finalized');
    console.log(`    ✅ - Latest Blockhash: ${blockhash}`);
    // Step 4 - Assemble Transaction
    console.log(`Step 4 - Assemble Transaction`);
    const messageV0 = new TransactionMessage({
        payerKey: walletKeyPair.publicKey,
        recentBlockhash: blockhash,
        instructions: [burnIx]
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([walletKeyPair]);
    console.log(`    ✅ - Transaction Created and Signed`);
    // Step 5 - Execute & Confirm Transaction
    console.log(`Step 5 - Execute & Confirm Transaction`);
    const txid = await SOLANA_CONNECTION.sendTransaction(transaction);
    console.log("    ✅ - Transaction sent to network");
    const confirmation = await SOLANA_CONNECTION.confirmTransaction({
        signature: txid,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight
    });
    if (confirmation.value.err) { throw new Error("    ❌ - Transaction not confirmed.") }
    console.log('🔥 SACRIFICED 1 PAWN 🔥', '\n', `https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
})();
