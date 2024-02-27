import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface UserTokenBalanceStore extends State {
  balance: number;
  getUserTokenBalance: (publicKey: PublicKey, mintAddress: PublicKey, connection: Connection) => void
}

const useUserTokenBalanceStore = create<UserTokenBalanceStore>((set, _get) => ({
  balance: 0,
  getUserTokenBalance: async (publicKey, mintAddress, connection) => {
    let balance = 0;
    try {
      // Replace this line with the appropriate method to fetch the token balance
      balance = await connection.getTokenAccountBalance(publicKey, mintAddress);
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.balance = balance;
      console.log(`balance updated, `, balance);
    })
  },
}));

export default useUserTokenBalanceStore;

interface UserSOLBalanceStore extends State {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0;
    try {
      balance = await connection.getBalance(
        publicKey,
        'confirmed'
      );
      balance = balance / LAMPORTS_PER_SOL;
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.balance = balance;
      console.log(`balance updated, `, balance);
    })
  },
}));

export default useUserSOLBalanceStore;