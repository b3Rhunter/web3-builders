import Evan from './evan.jpg';
import Will from './will.jpg';
import Pub from './pub.jpg';

function Team() {
    return (
        <div className='team'>
            <div className='evan'>
                <a href='https://twitter.com/evan_van_ness' target='_blank' rel="noreferrer">
                <img src={Evan} alt='Evan'/>
                <div>
                    <p><strong>Evan Van Ness</strong></p>
                    <p>@evan_van_ness</p>
                </div>
                </a>
            </div>
            <div className='will'>
                <a href='https://twitter.com/wsfoxley' target='_blank' rel="noreferrer">
                <img src={Will} alt='Will'/>
                <div>
                    <p><strong>Will Foxley</strong></p>
                    <p>@wsfoxley</p>
                </div>
                </a>
            </div>

            <div className='evan'>
                <a href='https://twitter.com/ssailsbury' target='_blank' rel="noreferrer">
                <img src={Pub} alt='Pub'/>
                <div>
                    <p><strong>Stanton Sailsbury</strong></p>
                    <p>@ssailsbury</p>
                </div>
                </a>
            </div>
        </div>
    );
}

export default Team;