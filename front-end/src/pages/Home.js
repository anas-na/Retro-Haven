import "../styles/Home.css";
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
  getDownloadURL
} from "firebase/storage";
import { useState } from "react";
import GamingItems from "../components/GamingItems";
import { setCookie, getCookie } from "../util/cookies.js";
import ProductSlider from "../components/ItemsCard";
import { MDBBtn } from "mdb-react-ui-kit";
import MoviesItems from "../components/MoviesItems";
import { MDBTypography } from "mdb-react-ui-kit";

const Home = () => {
  let history = useHistory();

  const handleHomeButton = () => {
    setCookie("hasVisited", "true");
    history.push("/items");
  };

  return (
    <div className="homeContainer">
      <h4 className="homeMainTitle">Welcome To Retro Haven</h4>

      <div className="gamingItems">
        <MDBTypography tag="h1" className="homeTitles">
          Gaming:
        </MDBTypography>
        <hr className="mt-0 mb-4" />
        <GamingItems />
      </div>
      <div className="moviesItems">
        <MDBTypography tag="h1" className="homeTitles">
          Movies/Tv:
        </MDBTypography>
        <hr className="mt-0 mb-4" />
        <MoviesItems />
      </div>
      <div type="" className="homeButton" onClick={handleHomeButton}>
        Click For More
      </div>
    </div>
  );
};

export default Home;
