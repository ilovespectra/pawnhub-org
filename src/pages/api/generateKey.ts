// pages/api/generateKey.ts

import { exec } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

// Define your RPC URL
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Update the solana-keygen command to include your RPC URL
  const command = `solana-keygen grind --starts-with pawn:1`;

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(error || stderr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    
    // Extract the file name from the stdout
    const match = stdout.match(/Wrote keypair to (\S+)/);
    if (!match || match.length < 2) {
      return res.status(500).json({ error: 'Failed to generate keypair' });
    }
    const filename = match[1];

    // Set the response headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');

    // Read the contents of the key pair file and send it as the response
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), filename);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Error reading key pair file:', err);
        return res.status(500).json({ error: 'Failed to read key pair file' });
      }
      res.status(200).send(data);
    });
  });
}
