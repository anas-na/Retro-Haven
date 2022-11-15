import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../providers/UserProvider";
import "../styles/profile.css";
import blankPhoto from '../styles/media/blankUser.png'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// import useUser from "../hooks/useUser";
import LoadingScreen from "../components/LoadingScreen";
import { storage } from "../services/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import {
  MDBCol,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon
} from "mdb-react-ui-kit";
import { apiURL } from "../util/apiURL";

const moment = require("moment")
const API = apiURL();

const Profile = props => {
  // console.log(props.history.location.state.request)

  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUserItems, setCurrentUserItems] = useState(null);
  const [currentUserBoughtItems, setcurrentUserBoughtItems] = useState(null);
  const [loading, setLoading] = useState(true);

  const fbUser = useContext(UserContext);

  const getUser = async () => {
    try {
      if (fbUser) {
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
    console.log("getItems func", allItems.data);
    setItems(allItems.data);
  };

  const images = document.querySelectorAll('img');

images.forEach((image) => {
   if (image.getAttribute('src') === '') image.src = blankPhoto;
});

  const getCurrentUserItems = () => {
    // console.log("fbUser", fbUser)
    // console.log("ITEMS", items)
    if (!fbUser) {
      LoadingScreen();
    } else if (items) {
      let theItems;
      theItems = items.filter(item => fbUser.uid === item.listedby_id);
      theItems.length > 0
        ? setCurrentUserItems(theItems)
        : setCurrentUserItems(null);

      console.log("listed:", theItems);
    }
  };
  const getCurrentUserBoughtItems = () => {
    // console.log("fbUser", fbUser)
    // console.log("ITEMS", items)
    if (!fbUser) {
      LoadingScreen();
    } else if (items) {
      let boughtItems;
      boughtItems = items.filter(item => fbUser.uid === item.boughtby_id);
      boughtItems.length > 0
        ? setcurrentUserBoughtItems(boughtItems)
        : setcurrentUserBoughtItems(null);

      console.log("bought", boughtItems);
    }
  };

  useEffect(
    () => {
      setTimeout(() => {
        setLoading(false);
      }, 750);
      getUser().then(user => {
        getItems(user);
        getCurrentUserItems(user);
        getCurrentUserBoughtItems(user);
      });
    },
    [fbUser]
  );

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
    return LoadingScreen();
  }
  console.log(currentUserItems);
  return (
    <div className="profile">
      <div className="profileTitle">
        <MDBTypography tag="h2" className="title">
          {user
            ? "Welcome " + user.first_name + "!"
            : "You're not signed in! Please log in/sign up :)"}{" "}
        </MDBTypography>
      </div>
      <div className="userCard">
        <section className="userMain">
          <img
            src={user.image}
            alt="Avatar"
            className="my-3 avatar"
            // style={{ width: "150px" }}
            fluid
            
          />
          <h5 className="p-2">
            {user.first_name} {user.last_name}
          </h5>
          <h6 className="p-2">Web Designer</h6>
        </section>
        <section className="userInfo">
          <MDBTypography tag="h6" className="text-center">
            Information
          </MDBTypography>
          <hr className="mt-0 mb-4" />
          <MDBRow className="pt-1">
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Email:</MDBTypography>
              <MDBCardText className="text-muted">
                {user.email}
              </MDBCardText>
              <MDBTypography tag="h6">Date Of Birth:</MDBTypography>
              <MDBCardText className="text-muted">
                {moment(user.date_of_birth).format("MMM Do YYYY")}
              </MDBCardText>
            </MDBCol>
            <MDBCol size="6" className="mb-3">
              <MDBTypography tag="h6">Phone:</MDBTypography>
              <MDBCardText className="text-muted">
                {user.phone_number}
              </MDBCardText>
              <MDBTypography tag="h6">Address:</MDBTypography>
              <MDBCardText className="text-muted">
                {user.address}
              </MDBCardText>
            </MDBCol>
          </MDBRow>

          <MDBTypography tag="h6" className="text-center">
            Listed Items
          </MDBTypography>
          <hr className="mt-0 mb-4" />

          {currentUserItems
            ? currentUserItems.map(item => {
                return (
                  <div className="usersItems">
                    <MDBCol size="6" className="mb-3">
                      {/* <MDBTypography tag="h6">Items Name:</MDBTypography> */}
                      <MDBCardText className="text-muted">
                        {item.name}
                      </MDBCardText>
                      </MDBCol>
                      <hr className="mt-0 mb-4" />
                      <MDBCol size="6" className="mb-3">
                      {/* <MDBTypography tag="h6">Price:</MDBTypography> */}
                      <MDBCardText className="text-muted">
                        ${item.price}
                      </MDBCardText>
                    </MDBCol>
                  </div>
                );
              })
            : "No Items yet! Go ahead and list one to get started!"}
        </section>
      </div>
    </div>
  );
};

export default Profile;
//
