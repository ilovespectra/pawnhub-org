import React, { useState } from 'react';
import { Connection, PublicKey, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { createBurnCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

const BurnTokenComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [burnResult, setBurnResult] = useState(null);
    const { publicKey, signTransaction, connect } = useWallet();
    // Define the token program ID
const TOKEN_PROGRAM_ID = new PublicKey('PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc');

// Define your Helius API key
const HELIUS_API = process.env.NEXT_PUBLIC_RPC_URL;

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (!publicKey) {
                throw new Error('Wallet not connected. Please connect your wallet.');
            }
    
            console.log("Fetching associated token address...");
            // Define constants
            const QUICKNODE_RPC = process.env.NEXT_PUBLIC_RPC_URL;
            const MINT_ADDRESS = 'PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc';
            const MINT_DECIMALS = 5;
            const BURN_QUANTITY_PAWN = 420;
            const BURN_QUANTITY_LAMPORTS = BURN_QUANTITY_PAWN * Math.pow(10, MINT_DECIMALS);
    
            // Fetch associated token account address
            const account = await getAssociatedTokenAddress(new PublicKey(MINT_ADDRESS), publicKey);
            console.log("Associated token address fetched:", account);
            console.log("Priority fee payer:", publicKey.toString());
            console.log("Creating burn instruction...");
            // Create burn instruction
            const burnIx = createBurnCheckedInstruction(
                account,
                new PublicKey(MINT_ADDRESS),
                publicKey,
                BURN_QUANTITY_LAMPORTS,
                MINT_DECIMALS
            );
            console.log("Burn instruction created:", burnIx);
    
            console.log("Connecting to Solana network...");
            // Connect to Solana network
            const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
    
            console.log("Fetching latest blockhash...");
            // Fetch blockhash
            const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash('finalized');
            console.log("Latest blockhash fetched:", blockhash);
    
            console.log("Estimating priority fees...");
            // Fetch priority fees
            const response = await fetch(`${HELIUS_API}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "getPriorityFeeEstimate",
                    params: [{
                        "accountKeys": [TOKEN_PROGRAM_ID.toBase58()],
                        "options": {
                            "includeAllPriorityFeeLevels": true,
                        }
                    }]
                }),
            });
            const responseJson = await response.json();
            let fees = responseJson?.result?.priorityFeeLevels?.high ?? 0;
            console.log(`HIGH priority fee: ${fees} lamports`);

            // Triple the fee quote
            fees *= 10;

            console.log(`Adjusted priority fee: ${fees} lamports`);
            console.log("Assembling transaction...");
            // Assemble transaction with priority fee
            const messageV0 = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: blockhash,
                instructions: [burnIx],
                feePayer: publicKey, // Set the fee payer to the connected wallet
                recentFeeCalculation: { // Include the priority fee
                    value: {
                        lamportsPerSignature: fees
                    }
                }
            }).compileToV0Message();
            const transaction = new VersionedTransaction(messageV0);
            console.log("Transaction assembled:", transaction);
    
            console.log("Signing transaction...");
            // Sign transaction
            const signedTransaction = await signTransaction(transaction);
            console.log("Transaction signed:", signedTransaction);
    
            console.log("Sending transaction...");
            // Send transaction
            const txid = await SOLANA_CONNECTION.sendRawTransaction(signedTransaction.serialize());
            console.log("Transaction sent. Transaction ID:", txid);
    
            console.log("Confirming transaction...");
            // Confirm transaction
            const confirmation = await SOLANA_CONNECTION.confirmTransaction({
                signature: txid,
                blockhash: blockhash,
                lastValidBlockHeight: lastValidBlockHeight
            });
            console.log("Transaction confirmed:", confirmation);
    
            if (confirmation.value.err) {
                throw new Error("Transaction not confirmed.");
            }
    
            setBurnResult({
                success: true,
                txid: txid
            });
        } catch (error) {
            console.error('Error executing transaction:', error);
            setBurnResult({
                success: false,
                error: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const reloadPage = () => {
        window.location.reload(); // Reload the page
    };
    
    return (
        <div className="hero-content bg-black rounded-2xl text-center p-4">
            <div className="max-w-lg mx-auto">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center">
                        <img src="/burning.gif" alt="Loading..." style={{ width: '350px', height: 'auto'}} />
                    </div>
                ) : (
                    publicKey ? (
                        burnResult ? (
                            <img src="/repeat.gif" alt="Reload" className="w-12 h-12 cursor-pointer transform transition-transform duration-150 hover:scale-95" onClick={reloadPage} style={{ width: '350px', height: 'auto'}} />
                        ) : (
                            <img src="/burn420.gif" alt="Sacrifice 420 PAWN" className="w-12 h-12 cursor-pointer transform transition-transform duration-150 hover:scale-95" onClick={handleClick} style={{ width: '350px', height: 'auto'}} />
                        )
                    ) : (
                        <img src="/connect2burn.gif" alt="Connect to Burn" className="w-12 h-12 cursor-pointer" style={{ width: '350px', height: 'auto'}} />
                    )
                )}

                {burnResult && (
                    <div className="mt-4 text-left max-w-lg mx-auto">
                        {burnResult.success ? (
                            <div className="text-green-600">
                                <p>🔥 420 $PAWN smoked!</p>
                                <p><a href={`https://explorer.solana.com/tx/${burnResult.txid}?cluster=mainnet`} target="_blank" rel="noopener noreferrer" className="underline"><i>View Tx</i></a></p>

                            </div>
                        ) : (
                            <div className="text-red-600">
                                <p>{burnResult.error}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BurnTokenComponent;