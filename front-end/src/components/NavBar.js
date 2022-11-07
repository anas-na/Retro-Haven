import { NavLink, Link, useHistory } from "react-router-dom";
import "../styles/NavBar.css";
import logo from '../styles/media/Retro.svg'
import blankPhoto from '../styles/media/blankUser.png'
import useUser from "../hooks/useUser";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import axios from "axios";
import { apiURL } from "../util/apiURL";
// import setCookie from '../util/cookies.js';

const API = apiURL();

const NavBar = () => {
  
  const fbUser = useContext(UserContext);
  const { logOut } = useUser();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      if(fbUser){
        const { uid } = fbUser;
      let res = await axios.get(`${API}/users/${fbUser.uid}`);
      console.log(res.data)
      setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let history = useHistory()

  const navigateTo = () => history.push('/myprofile')

  const handleLogOut = () => {
    try {
      logOut();
      return;
    } catch (error) {
      alert(error);
    }
  };

  const handleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
    getUser()
  }, [fbUser]);


  if (fbUser) {

    return (
      <nav>
        <div className="navContainer">

            <Link to="/">
              <img src={logo} className="logo" />
            </Link>
         
       <div className="links">
            <NavLink
              to="/items"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              Items
            </NavLink>
          
            <NavLink
              to="/newitem"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              List An Item
            </NavLink>
          
            <NavLink
              to="/howItWorks"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              How It Works
            </NavLink>
            <NavLink
              to="/about"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              About
            </NavLink>


            </div>
          <section className="dropdownMenu">
            <img
              src={user.image}
              alt="user"
              className="profile"
              onClick={handleDropdown}
              />
            <ul className={!open ? "dropdown" : null} id="user-menu">
              <div className='dropButtons'>

              <button className="button1" onClick={navigateTo}>Profile</button>

              <button onClick={handleLogOut} className="button1">Sign Out</button>

              </div>
            </ul>
           
          </section>


        </div>
      </nav>
    );
  } else {
    return (
      <nav >

        <div className="navContainer" >
            <Link to="/" >
              <img src={logo} className="logo" />
            </Link>
          
          <div className="links">
            <NavLink
              to="/howItWorks"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              How It Works
            </NavLink>
            <NavLink
              to="/items"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              Items
            </NavLink>
            <NavLink
              to="/login"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              login
            </NavLink>
            <NavLink
              to="/about"
              activeStyle={{
                color: "white",
                fontSize: "1.8em",
                fontWeight: " bold",
              }}
            >
              About
            </NavLink>
         
          </div>
        </div>
      </nav>
    );
  }
};

export default NavBar;
