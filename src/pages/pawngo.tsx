// https://explorer.solana.com/tx/5ck7qNp5ZtWiSP8Lcsaxx5Fw6XuAFHk6mivqep986LPD41h4PTaPjhXardSAxSnw7wcPKNmyVMoQdTnaWTaeEgGj?cluster=mainnet

import css from "styled-jsx/css";

const pawn_integrations = "0";

const PawngoPage: React.FC = () => {
    return (
      <div className="container">
        <div className="token-links">
                <a href="https://jup.ag/swap/SOL-PAWNGO_2KTHLVmZTLneTxpxgn8Cbc3sZs8e7Hfnd3gtArpgGEZj" target="_blank" rel="noopener noreferrer" className="token-link">
                    <img src="jup.png" alt="Jupiter logo" className="token-logo" />
                </a>
                <a href="https://birdeye.so/token/2KTHLVmZTLneTxpxgn8Cbc3sZs8e7Hfnd3gtArpgGEZj?chain=solana" target="_blank" rel="noopener noreferrer" className="token-link">
                    <img src="birdeye.png" alt="Birdeye logo" className="token-logo" />
                </a>
            </div>
        <div className="about-container">
          <div className="about-box">
            <h2 className="about-title"><b>PAWNGO</b></h2>
            <p className="about-content">A very good girl</p>
          </div>
          <div className="about-box">
            <h2><b>GIGAALPHA</b></h2>
            <p>lol fr what are you even doing here?</p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>MINT</b></h2>
            <p className="about-content">10 Trillion PAWNGO minted on launch.<a href="https://birdeye.so/token/2KTHLVmZTLneTxpxgn8Cbc3sZs8e7Hfnd3gtArpgGEZj?chain=solana" target="_blank" rel="noopener noreferrer"><p className="underline"><i>Mint authority burnt.</i></p></a></p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>LIQUIDITY</b></h2>
            <p className="about-content">1 Trillion PAWNGO deployed to Raydium.<a href="https://explorer.solana.com/tx/5ck7qNp5ZtWiSP8Lcsaxx5Fw6XuAFHk6mivqep986LPD41h4PTaPjhXardSAxSnw7wcPKNmyVMoQdTnaWTaeEgGj" target="_blank" rel="noopener noreferrer"><p className="underline"><i>Liquidity tokens burnt.</i></p></a></p>
          </div>
          <div className="about-box">
            <h2><b>REWARDS</b></h2>
            <p>Burn moar $PAWN, earn moar $PAWNGO</p>
          </div>
        <div className="about-box">
          <h2 className="about-title"><b>DISTRIBUTION</b></h2>
            <p><i>TBA</i></p>
          </div>
        </div>
      </div>
    );
  }
  
  export default PawngoPage;