import { createQR, encodeURL, TransferRequestURLFields } from "@solana/pay";
import { Keypair, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { FC, useEffect, useRef } from "react";


type TransferRequestQRProps = {
  reference: PublicKey,
};

export const TransferRequestQR: FC<TransferRequestQRProps> = ({ reference }) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const wallet = {
    amountToSend: new BigNumber(100), // amount in PAWN
    account: new PublicKey("YOUR_WALLET_PUBLIC_KEY"),
  };

  useEffect(() => {
    // Create a transfer request QR code
    type TransferRequestURLFields = {
      recipient: PublicKey;
      amount: BigNumber;
      reference: PublicKey;
      label: string;
      message: string;
      feePayer: PublicKey; // Add 'feePayer' property
    };

    const urlParams: TransferRequestURLFields = {
      recipient: new PublicKey("7cFavLSqPDgU6RVQt1sa2GpjVXeDssU4sef68VDbfc2E"),
      amount: wallet.amountToSend,
      reference,
      label: 'Queens Gambit',
      message: 'Thank you for your sacrifice!',
      feePayer: wallet.account,
    };
    const solanaUrl = encodeURL(urlParams);
    const qr = createQR(solanaUrl, 512, 'transparent')
    qr.update({ backgroundOptions: { round: 1000 } });
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  }, [reference, wallet]);

  return (
    <div className="rounded-2xl">
      <div ref={qrRef} />
    </div>
  )
}
