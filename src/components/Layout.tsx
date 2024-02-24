import { FC } from "react";
import pkg from '../../package.json';
import { Heading } from "./Heading";
import { WalletSolBalance } from "./WalletSolBalance";

export const Layout: FC = ({ children }) => {
  return (
    <div className="md:hero mx-auto p-4 bg-grey-800">
      <div className="md:hero-content flex flex-col">
        <Heading>
          Pawn Hub<span className='text-sm font-normal align-top text-slate-700'></span>
        </Heading>
        {children}
        <div className="text-center">
        </div>
      </div>
    </div>
  )
}