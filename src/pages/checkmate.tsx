import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';// Assuming you have a custom hook for wallet connection
import { useRouter } from 'next/router'; // Assuming you are using Next.js router

const AirdropChecker = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [allocation, setAllocation] = useState('');
  const [manualWalletAddress, setManualWalletAddress] = useState('');
  const [manualAllocation, setManualAllocation] = useState('');
  const [connectedAllocation, setConnectedAllocation] = useState(null);
  const [walletsList, setWalletsList] = useState({});
  const { publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_WALLET_LIST_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch wallet data');
        }
        const data = await response.json();
        setWalletsList(data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchWalletData();
  }, []);


  // Function to retrieve connected wallet information from local storage
  const getConnectedWalletFromLocalStorage = () => {
    const connectedWallet = localStorage.getItem('connectedWallet');
    if (connectedWallet) {
      setConnectedAllocation(connectedWallet);
    }
  };

  const handleCheckAllocation = () => {
    if (walletsList && walletsList.hasOwnProperty && walletsList.hasOwnProperty(manualWalletAddress)) {
      const formattedAllocation = Number(walletsList[manualWalletAddress]).toLocaleString();
      setManualAllocation(formattedAllocation);
    } else {
      setManualAllocation('no');
    }
  };
  

  useEffect(() => {
  if (publicKey && walletsList && Object.keys(walletsList).length > 0 && walletsList.hasOwnProperty(publicKey.toBase58())) {
    const formattedAllocation = Number(walletsList[publicKey.toBase58()]).toLocaleString();
    setConnectedAllocation(formattedAllocation);
    // Save connected wallet information to local storage
    localStorage.setItem('connectedWallet', formattedAllocation);
  } else {
    setConnectedAllocation('');
    localStorage.removeItem('connectedWallet'); // Remove from local storage if no connected wallet
  }
}, [publicKey, walletsList]);


  // Retrieve connected wallet information from local storage when the component mounts
  useEffect(() => {
    getConnectedWalletFromLocalStorage();
  }, [router]); // Listen to router changes instead of location changes

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Refresh the webpage
    window.location.reload();
  };

  

  return (
    <div className="container">
      <div>
        <div className="bg-black-800 text-white py-4 px-4 text-center font-bold">
          <div>
            {connectedAllocation !== null && connectedAllocation !== '' ? (
              <div className="bg-purple-800 text-white rounded-full py-4 px-4 text-center font-bold">
                <p>You will receive {connectedAllocation} PAWN!</p>
              </div>
            ) : (
              <div className="bg-purple-800 text-white rounded-full py-4 px-4 text-center font-bold">
                <p>Connect a wallet to check the associated allocation</p>
              </div>
            )}
            {/* Add the circular refresh button */}
            <button
              className="refresh-button"
              onClick={handleRefresh}
              disabled={refreshing} // Disable the button while refreshing
            >
              {refreshing ? 'Refreshing...' : ''}
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter a wallet address"
            value={manualWalletAddress}
            className="bg-gray-800 text-grey-200 rounded-lg px-4 py-2 w-64"
            onChange={(e) => setManualWalletAddress(e.target.value)}
          />
          <button onClick={handleCheckAllocation} className="bg-purple-500 text-white px-4 py-2 rounded custom-button">
            ♟️ Check
          </button>
        </div>
        <br /><br />
        {manualAllocation && (
          <div>
            <div className="bg-purple-800 text-white rounded-full py-4 px-4 text-center font-bold">
              <p>Queried wallet will receive {manualAllocation} PAWN!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AirdropChecker;
