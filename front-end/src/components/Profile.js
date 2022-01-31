import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import "../styles/profile.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import useUser from "../hooks/useUser";
import LoadingScreen from "../components/LoadingScreen";

import { apiURL } from "../util/apiURL";

const API = apiURL();

const Profile = (props) => {

  
  // console.log(props.history.location.state.request)

  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fbUser = useContext(UserContext);
  console.log(fbUser)
 
    const getUser = async () => {
      try {
        if(fbUser){
          const { uid } = fbUser;
        let res = await axios.get(`${API}/users/${fbUser.uid}`);
        console.log(res)
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
      theItems = items.filter((item) => fbUser.uid === item.user_id);
      theItems.length > 0 ? setCurrentUserItems(theItems) : setCurrentUserItems(null)
    
      console.log(theItems)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750);
    getUser().then(user=>{
      getItems(user);
      getCurrentUserItems(user);
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
  //     setCurrentUserItems(items.filter((item) => user.uid === item.user_id))
  //   }
  // }, [items, user])

  // console.log(currentUserItems)

  if (loading) {
    return LoadingScreen()
  }
  // console.log(user)
  console.log(currentUserItems)
  return (
    <div>
      <div className="profileTitle">
      <h3>Your Profile:</h3>
      <h3>
        {user
          ? "Welcome " + user.first_name + "!"
          : "You're not signed in! Please log in/sign up :)"}{" "}
      </h3>
      </div>
      {/* <img src={user.img} alt={user.name} /> */}
      <div className="user">
      <img src={user.image}/>
      <div className="userInfo">
      <p>Name: {user.first_name} {user.last_name}</p>
      <p> Email:{user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <p>Adress: {user.address}</p>
      </div>
      </div>
      <div>
      <label htmlFor="userItems">My Items </label>
      <div className="userItems">
        <h3>My Items:</h3>
        {currentUserItems
          ? currentUserItems.map((item) => {
              return (
                <div className="usersItems">
                  
                  {/* display currentUser item names & reviews */}
                  <li><h6>{item.name}</h6>
                      <img src={item.photo}/></li> 
                  <p>{item.review}</p>
                </div>
              );
            })
          : "No Items yet! Go ahead and list one to get started!"}
      </div>
      </div>
      {/* <button onClick={handleEdit}>Edit</button> */}
    </div>
  );
};

export default Profile;
