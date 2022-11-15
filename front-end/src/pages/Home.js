import '../styles/Home.css'
import React from "react";
import { useHistory } from "react-router";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import SignUp from "./Signup";
import { storage } from "../services/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import GamingItems from '../components/GamingItems';
import {setCookie, getCookie} from '../util/cookies.js';
import ProductSlider from '../components/ItemsCard';
import { MDBBtn } from 'mdb-react-ui-kit';
import MoviesItems from '../components/MoviesItems'
import {
  MDBTypography
} from "mdb-react-ui-kit";




const Home = () => {
  let history = useHistory();
  // const { logOut } = useUser();

  // const handleLogOut = () => {
  //   try {
  //     logOut();
  //     return;
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const handleHomeButton = () => {
    setCookie("hasVisited", "true")
    history.push('/items')
  }

  return (
    <div className='homeContainer' >
     
      <h9>Welcome To Retro Haven</h9>
     
     {/* <h10>Your <h11>Number 1 Destination</h11>, for buying or selling anything <h11>Retro </h11> that you desire, <h11>anywhere</h11> in USA.</h10> */}
     <div className='gamingItems'>
     <MDBTypography tag="h1" className="homeTitles">
            Gaming:
          </MDBTypography>
          <hr className="mt-0 mb-4" />
      <GamingItems />
      </div>
      <div className='moviesItems'>
      <MDBTypography tag="h1" className="homeTitles">
            Movies/Tv:
          </MDBTypography>
          <hr className="mt-0 mb-4" />
      <MoviesItems />
      </div>
      
    {/* create a button "get started" that links to sign up page/ hool the cookie to it*/}
    {/* <a href='/items'> */}
    <div className='homeButton'  onClick={handleHomeButton}>Click For More</div>
    {/* </a> */}
    {/* <MDBBtn rounded className='homeButton' color='secondary' href='/items' onClick={setCookie("hasVisited", "true")}>
        Click For More
      </MDBBtn> */}
    </div>
  );
};

export default Home;
