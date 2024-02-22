import css from "styled-jsx/css";

const AboutPage: React.FC = () => {
    return (
      <div className="container">
        <div className="about-container">
          <div className="about-box">
            <h2 className="about-title"><b>Creation</b></h2>
            <p className="about-content">Just a pawn in someone&apos;s experiment! Pawn DAO was created as an experiment in DAO theory, designed to push the boundaries on rewards for participation.</p>
          </div>
          <div className="about-box">
            <h2><b>Mission</b></h2>
            <p>Our goal is to elevate community members to drive initiatives that improve the user experience pertaining to SPL Governance on Realms for both new and power users.</p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>Mint</b></h2>
            <p className="about-content">10 Trillion PAWN minted on launch.<a href="https://birdeye.so/token/PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc?chain=solana" target="_blank" rel="noopener noreferrer"><p className="underline">Mint authority burnt.</p></a></p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>Liquidity</b></h2>
            <p className="about-content">1 Trillion PAWN deployed to Raydium.<a href="https://solana.fm/tx/33gJsqowePCiFaBBjHKW6NjDQvgvpHdedo3wqhtdq52m6QZDEaJh4mLFK2tMfmg91DR4YJMD7spgE2FftQ8qetin" target="_blank" rel="noopener noreferrer"><p className="underline">Liquidity tokens burnt.</p></a></p>
          </div>
          <div className="about-box">
            <h2><b>Rewards</b></h2>
            <p>We&apos;ve partnered with Kamino to offer liquidity providers native rewards. PAWN/SOL liquidity providers will have the opportunity to earn <b>moar</b> PAWN/SOL liquidity <i>(k-tokens)</i>!</p>
          </div>
          <div className="about-box">
            <h2><b>The Experiment</b></h2>
            <p>All part of the experiment! We embark on an uncharted path into the unknown elements of DAO governance, game theory, and tokenomics in order to illuminate the possibilities enabled by SPL governance.</p>
          </div>
          <div className="about-box2">
            <h2 className="text-xl mb-4"><b>Distribution</b></h2>
            <p>1) <b>Pawn DAO:</b> 59% of supply allocated to Pawn DAO Realms Treasury:</p><br></br>
            <ul>&bull; <b>Solana Ecosystem:</b> 33% to Solana Ecosystem Communities</ul>
            <ul>&bull; <b>Liquidity Pool:</b> 10% to Liquidity Provision</ul>
            <ul>&bull; <b>Reserve Fund:</b> 5% to Pawn Marketing</ul>
            <ul>&bull; <b>Team and Creators:</b> 5% for “PAWN” Reserve</ul>
            <ul>&bull; <b>Dean & Butter:</b> 3.4% to Dean & Butter for roles provided</ul>
            <ul>&bull; <b>Repayment to The King:</b> 2.6% to The King for deploying Liquidity</ul><br></br>
            <ul>2) <b>Pawn Community:</b> 34% airdropped to early “Pawn” Contributors </ul><br></br>
            <ul>3) <b>Tatami Maker:</b> 7% to Tatami Maker and All Stars</ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default AboutPage;