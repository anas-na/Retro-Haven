import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../providers/UserProvider";
import "../styles/profile.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import useUser from "../hooks/useUser";
import LoadingScreen from "../components/LoadingScreen";
import { storage } from "../services/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { apiURL } from "../util/apiURL";

const API = apiURL();

const Profile = (props) => {

  
  // console.log(props.history.location.state.request)

  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState(null);
  const [currentUserBoughtItems, setcurrentUserBoughtItems] = useState(null)
  const [loading, setLoading] = useState(true);

  const fbUser = useContext(UserContext);
 
    const getUser = async () => {
      try {
        if(fbUser){
          const { uid } = fbUser;
        let res = await axios.get(`${API}/users/${fbUser.uid}`);
        setUser(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    

  const getItems = async () => {
    let allItems = await axios.get(`${API}/items`);
    console.log('getItems func',allItems.data)
    setItems(allItems.data);
  };

  const getCurrentUserItems = () => {
    // console.log("fbUser", fbUser)
    // console.log("ITEMS", items)
    if (!fbUser) {
       LoadingScreen()
    }else if(items){
      let theItems;
      theItems = items.filter((item) => fbUser.uid === item.listedby_id);
      theItems.length > 0 ? setCurrentUserItems(theItems) : setCurrentUserItems(null)
    
      console.log('listed:', theItems)
    }
  }
  const getCurrentUserBoughtItems = () => {
    // console.log("fbUser", fbUser)
    // console.log("ITEMS", items)
    if (!fbUser) {
       LoadingScreen()
    }else if(items){
      let boughtItems;
      boughtItems = items.filter((item) => fbUser.uid === item.boughtby_id);
      boughtItems.length > 0 ? setcurrentUserBoughtItems(boughtItems) : setcurrentUserBoughtItems(null)
    
      console.log('bought', boughtItems)
    }
  }
  

  
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
    getUser().then(user=>{
      getItems(user);
      getCurrentUserItems(user);
      getCurrentUserBoughtItems(user);
    })
  }, [fbUser]);

  // useEffect(() => {
  //   getUser();
  // }, [fbUser]);

  // useEffect(() => {
  //   getItems()
  // }, [])

  // useEffect(() => {
  //   if(items && user) {
  //     setCurrentUserItems(items.filter((item) => user.uid === item.listedby_id))
  //   }
  // }, [items, user])

  // console.log(currentUserItems)

  if (loading) {
    return LoadingScreen()
  }
  console.log(currentUserItems)
  return (
    <div className="profile">
      <div className="profileTitle">
      <h3>
        {user
          ? "Welcome " + user.first_name + "!"
          : "You're not signed in! Please log in/sign up :)"}{" "}
      </h3>
      </div>
      {/* <img src={user.img} alt={user.name} /> */}
      <div className="profileInfo">
      <div className="user">
      <img className="userImage" src={user.image}/>
      <div className="userInfo">
      <p>Name: {user.first_name} {user.last_name}</p>
      <p> Email:{user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Adress: {user.address}</p>
      </div>
      </div>
      <div>
      <label htmlFor="userItems"></label>
        <h3>My Items:</h3>
      <div className="userItems">
        <div>
        <h1>listed Items:</h1>
        <div  className="listedItems">
        {currentUserItems
          ? currentUserItems.map((item) => {
              return (
                <div>
                  <p className="postedItems"><h6>{item.name}</h6>
                  <img src={item.photo}/></p>   
                  {/* <p>{item.review}</p> */}
                </div>
              );
            })
          : "No Items yet! Go ahead and list one to get started!"}
          </div>
          </div>
          <div>
            <h1>Bought Items:</h1>
          <div className="boughtItems">
          {currentUserBoughtItems
          ? currentUserBoughtItems.map((item) => {
              return (
                <div className="boughtItems">
                  <p className="postedItems"><h6>{item.name}</h6>
                  <img src={item.photo}/></p>   
                  {/* <p>{item.review}</p> */}
                </div>
              );
            })
          : "No Items yet! Go ahead and list one to get started!"}
          </div>
          </div>
      </div>
      </div>
      </div>
      {/* <button onClick={handleEdit}>Edit</button> */}
    </div>
  );
};

export default Profile;
