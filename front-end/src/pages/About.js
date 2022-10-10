import '../styles/About.css'
import Adam from'../styles/media/Adam.svg' 
import Anas from '../styles/media/Anas.svg'
import Carina from '../styles/media/Carina.svg'
import Demi from '../styles/media/Demi.svg'

export const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutBlurb">
        <h3>About Retro Haven:</h3>
        <h7>Retro Haven is a new way to get all retro items that brings the nostalgia of your childhood.
            With Retro Haven, you get the options to either get the items delivered to you through mail or picked up if it's close you. 
        </h7>
        <h3>Created By:</h3>
        <h7>Anas Nahil - FullStack Developer</h7>
        <br/>
        <br/>
        <h7><a target='_blank' href='https://docs.google.com/document/d/1P0KFwkVQZWobxsK0RC_PFKlpAL8jRsj2/'>Resume</a></h7>
        <br/>
        <br/>
        <h7><a target='_blank' href='https://www.linkedin.com/in/itsanasna/'>LinkedIn</a></h7>
        <br/>
        <br/>
        <h7><a target='_blank' href='https://github.com/anas-na'>Github</a></h7>   
      </div>
    </div>
  );
};
