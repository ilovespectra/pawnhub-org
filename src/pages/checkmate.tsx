import { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

const AirdropChecker = () => {
  const [manualWalletAddress, setManualWalletAddress] = useState('');
  const [manualAllocation, setManualAllocation] = useState('');
  const [walletsList, setWalletsList] = useState([]);
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

  const connectedAllocation = useMemo(() => {
    if (!publicKey || !walletsList || walletsList.length === 0) return '';
    const walletAddress = publicKey.toBase58();
    const connectedWallet = walletsList.find(wallet => wallet.address === walletAddress);
    return connectedWallet ? Number(connectedWallet.value).toLocaleString() : '';
  }, [publicKey, walletsList]);

  const handleRefresh = () => {
    // Refresh the webpage
    window.location.reload();
  };

  const handleCheckAllocation = () => {
    const queriedWallet = walletsList.find(wallet => wallet.address === manualWalletAddress);
    if (queriedWallet) {
      const formattedAllocation = Number(queriedWallet.value).toLocaleString();
      setManualAllocation(formattedAllocation);
    } else {
      setManualAllocation('no');
    }
  };

  return (
    <div className="container">
      <div>
        <div className="bg-black-800 text-white py-4 px-4 text-center font-bold">
          <div>
            {connectedAllocation !== '' ? (
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
            >
              Refresh
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
