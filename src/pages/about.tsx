import css from "styled-jsx/css";

const pawn_integrations = "0";

const AboutPage: React.FC = () => {
    return (
      <div className="container">
        <div className="about-container">
          <div className="about-box">
            <h2 className="about-title"><b>CREATION</b></h2>
            <p className="about-content">Just a pawn in someone&apos;s experiment! Pawn DAO was created as an experiment in DAO theory, designed to push the boundaries on rewards for participation.</p>
          </div>
          <div className="about-box">
            <h2><b>MISSION</b></h2>
            <p>Our goal is to elevate community members to drive initiatives that improve the user experience pertaining to SPL Governance on Realms for both new and power users.</p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>MINT</b></h2>
            <p className="about-content">10 Trillion PAWN minted on launch.<a href="https://birdeye.so/token/PawnQTCFsTwVFH2BHBvxyrq96m9G8QJGCGYev6VeYrc?chain=solana" target="_blank" rel="noopener noreferrer"><p className="underline"><i>Mint authority burnt.</i></p></a></p>
          </div>
          <div className="about-box">
            <h2 className="about-title"><b>LIQUIDITY</b></h2>
            <p className="about-content">1 Trillion PAWN deployed to Raydium.<a href="https://solana.fm/tx/33gJsqowePCiFaBBjHKW6NjDQvgvpHdedo3wqhtdq52m6QZDEaJh4mLFK2tMfmg91DR4YJMD7spgE2FftQ8qetin" target="_blank" rel="noopener noreferrer"><p className="underline"><i>Liquidity tokens burnt.</i></p></a></p>
          </div>
          <div className="about-box">
            <h2><b>REWARDS</b></h2>
            <p>We&apos;ve partnered with Kamino to offer liquidity providers native rewards. PAWN/SOL liquidity providers will have the opportunity to earn <b>moar</b> PAWN/SOL liquidity <i>(k-tokens)</i>!</p>
          </div>
          <div className="about-box">
          <h2 className="about-title"><b>GOVERNANCE</b></h2>
          <p>- 1 PAWN required to vote</p>
          <p>- 100M PAWN required to cast proposals</p>
          <p className="about-title"><a href="https://app.realms.today/dao/PAWN" target="_blank" rel="noopener noreferrer"><p className="underline"><i>Realms</i></p></a></p>
          </div>
          <div className="about-box">
          <h2 className="about-title"><b>INTEGRATIONS</b></h2>
        <h1>THERE ARE CURRENTLY <b>{pawn_integrations}</b> PAWN INTEGRATIONS</h1>
        <ul>-</ul>
        <ul>-</ul>
        <ul>-</ul>
        </div>
        <div className="about-box">
            <h2><b>THE EXPERIMENT</b></h2>
            <p>All part of the experiment! We embark on an uncharted path into the unknown elements of DAO governance, game theory, and tokenomics in order to illuminate the possibilities enabled by SPL governance.</p>
          </div>
        <div className="about-box2">
          <h2 className="about-title"><b>DISTRIBUTION</b></h2>
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