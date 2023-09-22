import Logo from './Logo.svg';

function Mint({mint, minted, connect, connected}) {
    return(
        <div className="mint">
            {!connected ? (
                          <button className='connect-btn' onClick={connect}>Connect</button>
                          ) : (
                            <>          
            {!minted ? (
                <button onClick={mint}>MINT</button>
            ) : (
                <>
                <img src={Logo} alt="nft" />
                <p>Minted! Thank you 🙏</p>
                </>
            )}
            </>
         )}
        </div>
    );
}

export default Mint;
