import { AiOutlineTwitter, AiFillYoutube, AiFillAmazonCircle, AiFillApple} from 'react-icons/ai';
import { BsSpotify } from 'react-icons/bs';
import { SiPandora } from 'react-icons/si';
import iHeart from './iheart_logo.svg';


function Home() {
    return (
       <div className='home'>
        <p>Welcome to the home of Web3 Builders, the premier podcast diving deep into the world of Ethereum development. 
            <br/><br/>
            Our mission is to bridge the gap between innovation and understanding, shining a spotlight on the talented developers shaping the future of the decentralized web. 
            <br/><br/>
            Whether you're a seasoned coder, an Ethereum enthusiast, or just crypto-curious, join us on a journey of discovery as we unpack the groundbreaking projects, smart contracts, and decentralized applications that are defining the next era of the internet. 
            <br/><br/>
            Subscribe now and become a part of the Web3 revolution!</p><div className="home-cont">
            <a href="https://twitter.com/web3builderspod" target="_blank" rel="noreferrer"><AiOutlineTwitter /></a>
            <a href="https://www.youtube.com/channel/UCUL5ZbRVivTBp_YEEx7SEGg" target="_blank" rel="noreferrer"><AiFillYoutube /></a>
            <a href="https://open.spotify.com/show/6eV2i8BgtnL002ZO7fUzp5?si=a2ba914bbb0e4ca0" target="_blank" rel="noreferrer"><BsSpotify /></a>
            <a href="https://music.amazon.com/podcasts/bcc08822-d259-42ae-b188-774d45665177/web3-builders" target="_blank" rel="noreferrer"><AiFillAmazonCircle /></a>
            <a href="https://podcasts.apple.com/us/podcast/web3-builders/id1697252853" target="_blank" rel="noreferrer"><AiFillApple /></a>
            <a className='pandora' href="https://pandora.app.link/pMGKewz5hDb" target="_blank" rel="noreferrer"><SiPandora /></a>
            <a href="https://www.iheart.com/podcast/269-web3-builders-120578714/" target="_blank" rel="noreferrer"><img style={{ width: "24px" }} src={iHeart} alt='iheart' /></a>
        </div>
       </div>

     
    );
}

export default Home;