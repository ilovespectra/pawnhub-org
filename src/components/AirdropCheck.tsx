import { useState } from 'react';

const AirdropChecker = () => {
  // List of wallets and their associated amounts
  const walletsList = {};

  const [walletAddress, setWalletAddress] = useState('');
  const [allocation, setAllocation] = useState('');

  const handleCheckAllocation = () => {
    if (walletsList.hasOwnProperty(walletAddress)) {
      setAllocation(walletsList[walletAddress]);
    } else {
      setAllocation('Sorry, no allocation');
    }
  };

  return (
    <div>
      <h1>Airdrop Allocation Checker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button onClick={handleCheckAllocation}>Check Allocation</button>
      </div>
      <div>
        {allocation && (
          <p>Allocation for {walletAddress}: {allocation}</p>
        )}
      </div>
    </div>
  );
};

export default AirdropChecker;
