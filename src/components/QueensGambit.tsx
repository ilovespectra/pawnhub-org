import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { useWallet } from '@solana/wallet-adapter-react';
import { createBurnCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app';
import Leaderboard from './Leaderboard';

const BurnTokenComponent = ({ firebaseApp }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [burnResult, setBurnResult] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState("medium");
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const { publicKey, signTransaction } = useWallet();

    // Define the token program ID
    const TOKEN_PROGRAM_ID = new PublicKey('PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc');
    const HELIUS_API = process.env.NEXT_PUBLIC_RPC_URL;
    // Firebase initialization moved inside the component
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
        appId: process.env.NEXT_PUBLIC_APP_ID
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const logBurnToFirestore = async (signer, quantity, txid) => {
        try {
            // Add a new document with a generated id
            const docRef = await addDoc(collection(db, "burns"), {
                signer,
                quantity,
                txid
            });
            console.log("Burn transaction logged to Firestore with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };
    const [burnQuantity, setBurnQuantity] = useState(""); 
    const handleQuantityChange = (event) => {
        setBurnQuantity(event.target.value);
      };

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (!publicKey) {
                throw new Error('Wallet not connected. Please connect your wallet.');
            }
    
            console.log("Fetching associated token address...");
            // Define constants
            const QUICKNODE_RPC = process.env.NEXT_PUBLIC_RPC_URL;
            const MINT_ADDRESS = TOKEN_PROGRAM_ID.toBase58();
            const MINT_DECIMALS = 5;
            const BURN_QUANTITY_PAWN = parseInt(burnQuantity);
            const BURN_QUANTITY_LAMPORTS = BURN_QUANTITY_PAWN * Math.pow(10, MINT_DECIMALS);
    
            // Fetch associated token account address
            const account = await getAssociatedTokenAddress(new PublicKey(MINT_ADDRESS), publicKey);
            console.log("Associated token address fetched:", account);
            
            console.log("Creating burn instruction...");
            // Create burn instruction
            const burnIx = createBurnCheckedInstruction(
                account,
                new PublicKey(MINT_ADDRESS),
                publicKey,
                BURN_QUANTITY_LAMPORTS,
                MINT_DECIMALS,
                
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
            console.log("Priority fee level:", responseJson.result.priorityFeeLevels);
            let fees = responseJson?.result?.priorityFeeLevels?.[selectedPriority] ?? 0;
            console.log("Estimated priority fees:", fees);
            fees *= 1;
            console.log("Assembling transaction...");
            // Assemble transaction with priority fee
            const transaction = new Transaction().add(burnIx);
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey; // Set the fee payer to the connected wallet's public key
            transaction.setSigners(publicKey); // Set the signer
            console.log("Transaction assembled:", transaction);
            console.log("Priority Feepayer:", transaction.feePayer.toBase58());
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
    
            // Log burn transaction to Firestore
            await logBurnToFirestore(publicKey.toString(), BURN_QUANTITY_PAWN, txid);
    
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
        <div className="hero-content bg-black rounded-2xl text-center p-4 w-4/5 max-w-screen-lg mx-auto" style={{ width: '800px', marginLeft: '50px', marginRight: '50px' }} >
            <div className="flex flex-col items-center justify-center">
                <div>
                <div style={{ width: '300px', height: 'auto' }} />
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center">
                            <img src="/burningpawn.gif" alt="Loading..." style={{ width: '300px', height: 'auto' }} />
                        </div>
                    ) : (
                        <>
                            {publicKey ? (
                                burnResult ? (
                                    burnResult.success ? (
                                        <img src="/repeat2.gif" alt="Reload" className="w-12 h-12 cursor-pointer transform transition-transform duration-150 hover:scale-95" onClick={reloadPage} style={{ width: '300px', height: 'auto' }} />
                                    ) : (
                                        <img src="/failedretry.gif" alt="Failed retry" className="w-12 h-12 cursor-pointer transform transition-transform duration-150 hover:scale-95" onClick={reloadPage} style={{ width: '300px', height: 'auto' }} />
                                    )
                                ) : (
                                    <img src="/burnpawn.gif" alt="Sacrifice PAWN" className="w-12 h-12 cursor-pointer transform transition-transform duration-150 hover:scale-95" onClick={handleClick} style={{ width: '300px', height: 'auto' }} />
                                )
                            ) : (
                                <img src="/connect2.gif" alt="Connect to Burn" className="w-12 h-12 cursor-pointer" style={{ width: '300px', height: 'auto' }} />
                            )}
                        </>
                    )}
                </div>
                <div>
      <input
        type="number"
        value={burnQuantity}
        onChange={handleQuantityChange}
        placeholder="Enter quantity to burn"
        className="bg-gray-800 text-white p-2 rounded-md outline-none mt-5"
      />
    </div>
                <div className="mt-4">
                    <Leaderboard firebaseApp={firebaseApp} refreshLeaderboard={() => {}} /> {/* Include Leaderboard component */}
                </div>
            </div>
        </div>
    );
};

export default BurnTokenComponent;
