import { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import Countdown from 'components/Countdown';

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

    if (!connectedWallet) {
      return 'notOnList'; // Indicate that the wallet is not on the drop list
    }

    const allocationValue = Number(connectedWallet.value);
    if (allocationValue === 0) {
      return 'no'; // If the allocation value is 0, return 'no'
    } else {
      return allocationValue.toLocaleString();
    }
  }, [publicKey, walletsList]);

  const handleCheckAllocation = () => {
    const queriedWallet = walletsList.find(wallet => wallet.address === manualWalletAddress);
    if (queriedWallet) {
      const formattedAllocation = Number(queriedWallet.value).toLocaleString();
      setManualAllocation(formattedAllocation);
    } else {
      setManualAllocation('no');
    }
  };

  console.log('Connected allocation:', connectedAllocation); // Log connected allocation

  return (
    <div className="container">
      <div>
        <div className="bg-black-800 text-white py-4 px-4 text-center font-bold">
          {connectedAllocation !== '' ? (
            <div className="bg-purple-800 text-white rounded-full py-4 px-4 text-center font-bold">
              {connectedAllocation !== 'no' && connectedAllocation !== 'notOnList' ? (
                <p>You will receive {connectedAllocation} PAWN!</p>
              ) : (
                <p>Sorry, you&apos;re not on the list.</p>
              )}
            </div>
          ) : (
            <div className="bg-purple-800 text-white rounded-full py-4 px-4 text-center font-bold">
              <p>Connect a wallet to check your allocation</p>
            </div>
          )}
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
        <br></br>
        <div className="centered-text">
          <div>
            <Countdown /> {/* Add the 'Countdown' component */}
          </div>
          <p className='text-gray-400 opacity-50'><i>Airdrop is NOT live yet!<br></br> Follow <a href=" https://twitter.com/pawnspl24" target="_blank" rel="noopener noreferrer" className='underline'>@pawnspl24</a> on Twitter to stay tuned!</i></p>
        </div>
      </div>
    </div>
  );
};

export default AirdropChecker;
