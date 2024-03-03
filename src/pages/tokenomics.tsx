import React from 'react';

const Tokenomics: React.FC = () => {
    return (
        <div className="container">
            <div className="about-container">
                <div className="about-box2">
                    <h2 className="about-title"><b>PAWN Tokenomics:</b></h2>
                    <p className="about-content">
                        The token allocation for Pawn was determined based on a careful balance between community participation, development needs, sustainability, and maintaining engagement. Here&apos;s a general guideline on how the token allocation was decided:
                    </p>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Token Information:</h2>
                    <ul className="about-list">
                        <li><b>Token Name:</b> PAWN</li>
                        <li><b>Token Symbol:</b> PAWN</li>
                        <li><b>Token Type:</b> SPL Token (Solana Program Library)</li>
                        <li><b>Total Supply:</b> 10,000,000,000,000 (10 Trillion Tokens)</li>
                        <li><b>Mint Authority:</b> Burnt (Minting authority disabled)</li>
                    </ul>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Token Allocation:</h2>
                    <ul className="about-list">
                        <li><b>Initial Circulating Supply:</b> 10,000,000,000,000 (10 Trillion Tokens)</li><br></br>
                        <li><b>Pawn DAO:</b> 59% of supply allocated to Pawn DAO Realms Treasury</li>
                        <li><b>&bull; Liquidity Pool:</b> 10% of supply allocated for Liquidity Provision</li>
                        <li><b>&bull; Reserve Fund:</b> 5% of supply allocated to Pawn Marketing</li>
                        <li><b>&bull; Team and Creators:</b> 5% of supply allocated for “PAWN” Reserve</li>
                        <li><b>&bull; Solana Ecosystem:</b> 33% of supply allocated to Solana Ecosystem Communities</li>
                        <li><b>&bull; Repayment to The King:</b> 2.6% reimbursed to The King for deploying Liquidity</li>
                        <li><b>&bull; Butter & Dean:</b> 3.4% allocated to Dean and Butter for roles provided</li>
                        <li><b>Pawn Community:</b> 34% of supply airdropped to early “Pawn” Contributors</li>
                        <li><b>Tatami Maker:</b> 7% of supply allocated to Tatami Maker and All Stars</li>
                    </ul>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Initial Circulating Supply:</h2>
                    <p className="about-content">
                        In the world of Memecoins, the Initial Circulating Supply typically spans from Several Billion to Several Quadrillion tokens. This approach mirrors the concept of acquiring millions of tokens at minimal costs, enhancing the accessibility and playful nature of the meme-driven ecosystem. (I.E “PAWN to 1$ will make you a millionaire if you hold 1 million tokens.)
                    </p>
                </div>
            
                <div className="about-box2">
                    <h2 className="about-title">Reserve Fund:</h2>
                    <p className="about-content">
                        The reserve fund functions as a token treasury, primarily used for marketing purposes. Some of those marketing purposes might be:<br></br><br></br>
                    </p>
                    <ul className="about-list">
                        <li>&bull; Meme creation competitions.</li>
                        <li>&bull; Enhancing social media visibility through incentivized activities like Tweet Raiding, Most Liked Comment, Most Retweeted Reply, Most Liked Meme etc.</li>
                        <li>&bull; Facilitating additional community airdrops.</li><br></br>
                    </ul>
                    <p className="about-content">
                        Allocating 5% of the total supply to the Reserve Fund reflects a well-balanced approach. When utilized wisely, it has the potential to create substantial community engagement, add value to token holders and strengthen the overall Brand presence.
                    </p>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Team and Creators:</h2>
                    <p className="about-content">
                        Like in any company where the employees hold stock, you should be taking the same approach when launching a token. The team that works on community building, operations, marketing, securing partnerships etc needs to have skin in the game. Allocating 5% of the supply towards the people who lay out the foundations of your project is fair. If you want to avoid having the team dumping the tokens very early, you can lock those tokens in a vesting contract and distribute them to the team once the contract expires. (Typical Vesting Contracts for such teams have a 6 - 18 month duration)
                    </p>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Liquidity Pool:</h2>
                    <p className="about-content">
                        There&apos;s not really an “perfect allocation” when it comes to the Liquidity Pool. Just remember this: If you provide very little liquidity, the price will change fast and people will most likely stop trading whereas if you provide too much liquidity, the price will change very slowly and people will need to trade with large amounts of money to move the price.
                    </p>
                </div>

                <div className="about-box2">
                    <h2 className="about-title">Community and Ecosystem:</h2>
                    <p className="about-content">
                        This is the most important part of the token&apos;s distribution. This part will be about airdropping 67% of your token&apos;s supply to the Solana community- 67% of the total allocation is to be airdropped towards the Solana Ecosystem and $PAWN early contributors.<br></br><br></br>
                    </p>
                    <p className="about-content">
                        So, How do we define the optimal airdrop recipients?<br></br><br></br>
                    </p>
                    <p className="about-content">
                        When launching a Memecoin you want to airdrop tokens to people that will add value to your community, just by being a part of it. Some of those people are:<br></br><br></br>
                    </p>
                    <ul className="about-list">
                        <li>&bull; Bluechip NFT holders <i>(SMB, Mad Lads, Degen Ape Academy, FFF, Galactic Geckos etc)</i></li>
                        <li>&bull; Members of Impactful DAOs in the space <i>(Dean’s List DAO, SuperteamDAO, MonkeDAO, Lamport DAO, BonkDAO, Dual DAO etc.)</i></li>
                        <li>&bull; Memecoin holders <i>(Holders of Bonk, Bern, Doggo, Cope etc.)</i></li>
                        <li>&bull; Solana NFT artists</li>
                        <li>&bull; Solana Developers</li>
                        <li>&bull; Teams you have partnered with and teams that helped your project grow.</li>
                        <li>&bull; Early Contributors to the Project</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Tokenomics;
