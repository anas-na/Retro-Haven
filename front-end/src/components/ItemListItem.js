// import '../styles/ItemList.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL.js";
import { useContext } from "react";
import { UserContext } from "../providers/UserProvider"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

const API = apiURL();


const ItemListItem = ({ item }) => {
  const user = useContext(UserContext);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get(`${API}/categories`);
      setCategories(res.data);
    };
    getCategories();
  }, []);
  if (!categories) {
    return <h6>Loading</h6>;
  }

  const category = categories.filter(
    (category) => category.id === item.category_id
  );
  
  return (

    // <MDBContainer  className="my-5 text-center singleItem">
      // <MDBRow>
        // {/* <MDBCol md="12" lg="4" className="mb-4"> */}
          <MDBCard  className=" card ">
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-zoom"
            >
              <MDBCardImage
                src={item.photo}
                fluid
                className="w-100 h-100 image"
              />
              <a href={`/items/${item.id}`}>
                <div className="mask">
                  <div className="d-flex justify-content-start align-items-end h-100">
                    <h5>
                      <span className="badge bg-primary ms-2">New</span>
                    </h5>
                  </div>
                </div>
                <div className="hover-overlay">
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </div>
              </a>
            </MDBRipple>
            <MDBCardBody className="Dark">
              <a href={`/items/${item.id}`} className="text-reset">
                <h5 className="card-title mb-3 Dark">{item.name}</h5>
              </a>
              {/* <a href={`/items/${item.id}`} className="text-reset Dark"> */}
                <p className="text-reset Dark">CATEGORY: {category[0].name.toUpperCase()}</p>
              {/* </a> */}
              <h6 className="mb-3 Dark">${item.price}</h6>
            </MDBCardBody>
          </MDBCard>
        //  </MDBCol>
        
      //  </MDBRow>
    // </MDBContainer>
  );


};

export default ItemListItem;
