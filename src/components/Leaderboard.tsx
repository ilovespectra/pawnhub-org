import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'; 
import { initializeApp } from 'firebase/app';

const Leaderboard = ({ firebaseApp, refreshLeaderboard }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [burnSuccess, setBurnSuccess] = useState(false);
    const [totalPawnSacrificed, setTotalPawnSacrificed] = useState(0);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const db = getFirestore(firebaseApp);
                const burnsCollection = collection(db, 'burns');
                const burnsQuery = query(burnsCollection);

                const snapshot = await getDocs(burnsQuery);
                const leaderboardMap = new Map();
                let totalQuantity = 0; // Initialize total quantity

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const { signer, quantity } = data;

                    totalQuantity += quantity; // Add quantity to total
                    if (leaderboardMap.has(signer)) {
                        leaderboardMap.set(signer, leaderboardMap.get(signer) + quantity);
                    } else {
                        leaderboardMap.set(signer, quantity);
                    }
                });

                setTotalPawnSacrificed(totalQuantity); // Set total quantity
                const sortedLeaderboardData = Array.from(leaderboardMap.entries())
                    .sort((a, b) => b[1] - a[1]); // Sort in descending order

                setLeaderboardData(sortedLeaderboardData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, [firebaseApp, refreshLeaderboard]);

    useEffect(() => {
        if (burnSuccess) {
            refreshLeaderboard();
            setBurnSuccess(false); // Reset burn success state after refreshing
        }
    }, [burnSuccess, refreshLeaderboard]);

    return (
        <div className="leaderboard mt-8 w-full max-w-screen-lg mx-auto">
            <div className="text-center mb-4">
                <img src="masters.png" alt="Masters" className="mx-auto" style={{ width: '50vh', height: 'auto' }}/>
            </div>
            <div className="total-sacrificed mb-4 p-4 border border-white rounded-md bg-black">
                <p>TOTAL  ♟️ BURNED:</p>
                <h3 className="font-bold text-xl text-white">{totalPawnSacrificed.toLocaleString()}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {leaderboardData.map(([signer, quantity], index) => (
                    <div key={signer} className="border border-gray-200 p-2 rounded-md bg-purple-900" style={{ width: '50vh', height: 'auto' }}>
                        <div className="font-bold text-lg text-purple-600">
                            {index + 1}. ♟️<span style={{ color: 'white' }}>{quantity.toLocaleString()}</span>
                        </div>
                        <div className="text-sm">{truncateSigner(signer)}</div>
                    </div>
                ))}
            </div>
            <p className="mt-10"><i>Not showing up?</i></p>
            <p><i>DM @tanny.sol your tx sig on twitter</i></p>
        </div>
    );    
};

// Function to truncate signer pubkey if it's too long
const truncateSigner = (signer) => {
    const maxLength = 21;
    if (signer.length > maxLength) {
        return `${signer.slice(0, maxLength)}...`;
    }
    return signer;
};

export default Leaderboard;
