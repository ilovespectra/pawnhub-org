// pages/api/generateKey.ts

import { exec } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

// Define your RPC URL
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow the following methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  // Allow the following headers
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Check if it's a preflight request
  if (req.method === 'OPTIONS') {
    // End the request with a 200 status for preflight requests
    res.status(200).end();
    return;
  }

  // Update the solana-keygen command to include your RPC URL
  const command = `solana-keygen grind --starts-with pawn:1`;

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(error || stderr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Extract the keypair from the stdout
    const match = stdout.match(/"pubkey": "([a-zA-Z0-9]+)"/);
    if (!match || match.length < 2) {
      return res.status(500).json({ error: 'Failed to generate keypair' });
    }
    const publicKey = match[1];

    // Send the public key as the response
    res.status(200).json({ publicKey });
  });
}
