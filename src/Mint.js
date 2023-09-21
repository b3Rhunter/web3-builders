import Logo from './Logo.svg';

function Mint({mint, minted}) {
    return(
        <div className="mint">
            {!minted ? (
                <button onClick={mint}>MINT</button>
            ) : (
                <>
                <img src={Logo} alt="nft" />
                <p>Minted! Thank you 🙏</p>
                </>
            )}
        </div>
    );
}

export default Mint;
